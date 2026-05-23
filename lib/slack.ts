export async function sendSlackNotification(lead: {
  name: string
  email: string
  phone?: string | null
  service?: string | null
  source: string
  createdAt: Date
}): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  const timestamp = lead.createdAt.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const text = [
    '🔔 *New Lead on hcihytech.com*',
    `*Name:* ${lead.name}`,
    `*Email:* ${lead.email}`,
    `*Phone:* ${lead.phone || 'N/A'}`,
    `*Service:* ${lead.service || 'N/A'}`,
    `*Source:* ${lead.source}`,
    `*Time:* ${timestamp}`,
  ].join('\n')

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}
