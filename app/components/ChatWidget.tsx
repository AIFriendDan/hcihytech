'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hey! I'm the HCiHY Tech assistant. I can help you learn about our web design, AI, and IT services, or get you connected with Dan. What can I help you with?",
}

const EMAIL_RE = /\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b/i
const PHONE_RE =
  /(\+?1?\s*[-.]?\s*\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})/

const LEAD_TRIGGER = /dan will be in touch/i

function extractLeadData(messages: Message[]) {
  const userText = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content)
    .join(' ')

  const email = userText.match(EMAIL_RE)?.[0]
  const phone = userText.match(PHONE_RE)?.[0]

  const allText = messages.map((m) => m.content).join(' ')
  let service: string | undefined
  const services = [
    'web design',
    'ai services',
    'ai starter',
    'ai growth',
    'ai enterprise',
    'it services',
    'remote support',
    'monthly',
  ]
  for (const s of services) {
    if (allText.toLowerCase().includes(s)) {
      service = s
      break
    }
  }

  // Best-effort name: look for user message that's short (likely a name)
  const nameGuess = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.trim())
    .find((c) => c.split(/\s+/).length <= 4 && !/[@.com]/.test(c) && c.length > 1)

  return { email, phone, service, name: nameGuess }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadSaved, setLeadSaved] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  async function saveLead(allMessages: Message[]) {
    if (leadSaved) return
    const { email, phone, service, name } = extractLeadData(allMessages)
    if (!email) return
    setLeadSaved(true)
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name || 'Chatbot Lead', email, phone, service }),
    }).catch(() => {})
  }

  async function sendMessage() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    const placeholder: Message = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, placeholder])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok || !response.body) throw new Error('Stream failed')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantContent += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: assistantContent,
          }
          return updated
        })
      }

      const finalMessages: Message[] = [
        ...updatedMessages,
        { role: 'assistant', content: assistantContent },
      ]

      if (LEAD_TRIGGER.test(assistantContent)) {
        await saveLead(finalMessages)
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I ran into an issue. Please try again or call us directly.",
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col w-[360px] max-h-[560px] rounded-2xl border border-hcihy-chrome/20 bg-hcihy-navy/95 backdrop-blur-sm shadow-2xl shadow-black/60 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-hcihy-blue shrink-0">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-hcihy-navy" />
              <span className="text-sm font-semibold text-hcihy-navy">HCiHY Tech Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-hcihy-navy/70 hover:text-hcihy-navy transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === 'user'
                      ? 'bg-hcihy-blue text-hcihy-navy font-medium rounded-br-sm'
                      : 'bg-neutral-800 text-neutral-100 rounded-bl-sm'
                  }`}
                >
                  {msg.content || (
                    <span className="inline-flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-neutral-800 px-3 py-3 flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-hcihy-cyan transition-colors disabled:opacity-50 max-h-24 overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="shrink-0 p-2 bg-hcihy-blue hover:bg-hcihy-cyan disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-hcihy-navy transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-hcihy-blue hover:bg-hcihy-cyan shadow-lg shadow-hcihy-blue/30 flex items-center justify-center text-hcihy-navy transition-all hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
