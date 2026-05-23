'use client'

import { useState, useEffect } from 'react'

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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-xl border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-1">Leads Dashboard</h1>
          <p className="text-gray-500 text-sm mb-6">HCiHY Tech</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-3 transition-colors"
            >
              {loading ? 'Loading…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {leads.length} total lead{leads.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-white text-sm transition-colors mt-1"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-500 font-medium px-4 py-3">Name</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3">Email</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3 hidden sm:table-cell">Phone</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3 hidden md:table-cell">Service</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3">Source</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3 hidden sm:table-cell">Status</th>
                  <th className="text-left text-gray-500 font-medium px-4 py-3 hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-600 py-16 text-base">
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  leads.map(lead => (
                    <tr
                      key={lead.id}
                      className="border-b border-gray-800 last:border-0 hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="text-white px-4 py-3 font-medium whitespace-nowrap">{lead.name}</td>
                      <td className="text-gray-300 px-4 py-3">{lead.email}</td>
                      <td className="text-gray-400 px-4 py-3 hidden sm:table-cell">{lead.phone || '—'}</td>
                      <td className="text-gray-400 px-4 py-3 hidden md:table-cell">{lead.service || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                            lead.source === 'chatbot'
                              ? 'bg-blue-950 text-blue-300 border-blue-800'
                              : 'bg-green-950 text-green-300 border-green-800'
                          }`}
                        >
                          {lead.source}
                        </span>
                      </td>
                      <td className="text-gray-400 px-4 py-3 hidden sm:table-cell capitalize">{lead.status}</td>
                      <td className="text-gray-500 px-4 py-3 hidden lg:table-cell whitespace-nowrap">
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
