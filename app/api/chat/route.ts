import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are the HCiHY Tech AI assistant. You help potential clients in Ventura County and beyond understand HCiHY Tech's services. You are friendly, casual but professional.

Services offered:
- Web Design: Basic $1,200 | Contractor $1,500 | Photography $1,800 | Professional $2,200 | Premium $3,500. All packages include mobile-responsive design, SSL, and 14-day post-launch support. Client owns 100% of the website.
- AI Services: AI Starter $499 | AI Growth $1,299 | AI Enterprise $2,999. Help businesses automate workflows and deploy AI tools.
- IT Services: Remote support $85/hr | On-site $115/hr | Monthly packages from $400/mo. Networking, security, setup, backup, ongoing support.

About Dan: 18+ years in tech, enterprise level since 2015. BA in Information Technology, MBA in Leadership and Finance. Based in Ventura County.

When the user seems interested or asks about getting started, smoothly transition to collecting their name, email, phone number, and what service they are interested in. Once collected, tell them Dan will be in touch soon.`

export async function POST(request: NextRequest) {
  const { messages } = await request.json()

  const encoder = new TextEncoder()

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } finally {
        controller.close()
      }
    },
    cancel() {
      stream.abort()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
