'use client'

import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  source: string
  status: string
  createdAt: string
}

export default function LeadsPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('leads_password')
    if (stored) fetchLeads(stored)
  }, [])

  async function fetchLeads(pwd: string) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads/list', {
        headers: { Authorization: `Bearer ${pwd}` },
      })
      if (res.status === 401) {
        setError('Incorrect password.')
        sessionStorage.removeItem('leads_password')
        setAuthed(false)
        return
      }
      const data = await res.json()
      setLeads(data.leads)
      setAuthed(true)
      sessionStorage.setItem('leads_password', pwd)
    } catch {
      setError('Failed to load leads.')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    await fetchLeads(password)
  }

  function handleLogout() {
    setAuthed(false)
    setLeads([])
    setPassword('')
    sessionStorage.removeItem('leads_password')
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-hcihy-navy/40 rounded-2xl p-8 w-full max-w-sm shadow-xl border border-hcihy-chrome/15 backdrop-blur-sm">
          <h1 className="font-headline text-2xl font-bold text-white mb-1">Leads Dashboard</h1>
          <p className="text-neutral-500 text-sm mb-6">HCiHY Tech</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="hcihy-input"
              required
            />
            {error && (
              <p className="flex items-center gap-2 text-hcihy-error text-sm">
                <AlertCircle size={16} className="shrink-0" /> {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-hcihy-primary w-full py-3 font-semibold disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-headline text-2xl font-bold text-white">Leads</h1>
            <p className="text-neutral-500 text-sm mt-0.5">
              {leads.length} total lead{leads.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-neutral-500 hover:text-white text-sm transition-colors mt-1"
          >
            Logout
          </button>
        </div>

        <div className="bg-hcihy-navy/30 rounded-2xl border border-hcihy-chrome/15 overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-hcihy-chrome/15">
                  <th className="text-left text-neutral-500 font-medium px-4 py-3">Name</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3">Email</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3 hidden sm:table-cell">Phone</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3 hidden md:table-cell">Service</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3">Source</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3 hidden sm:table-cell">Status</th>
                  <th className="text-left text-neutral-500 font-medium px-4 py-3 hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-neutral-600 py-16 text-base">
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr
                      key={lead.id}
                      className="border-b border-hcihy-chrome/15 last:border-0 hover:bg-hcihy-navy/40 transition-colors"
                    >
                      <td className="text-white px-4 py-3 font-medium whitespace-nowrap">{lead.name}</td>
                      <td className="text-neutral-300 px-4 py-3">{lead.email}</td>
                      <td className="text-neutral-400 px-4 py-3 hidden sm:table-cell">{lead.phone || '—'}</td>
                      <td className="text-neutral-400 px-4 py-3 hidden md:table-cell">{lead.service || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            lead.source === 'chatbot'
                              ? 'bg-hcihy-cyan/10 text-hcihy-cyan border-hcihy-cyan/30'
                              : 'bg-hcihy-emerald/10 text-hcihy-emerald border-hcihy-emerald/30'
                          }`}
                        >
                          {lead.source}
                        </span>
                      </td>
                      <td className="text-neutral-400 px-4 py-3 hidden sm:table-cell capitalize">{lead.status}</td>
                      <td className="text-neutral-500 px-4 py-3 hidden lg:table-cell whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
