import { ImageResponse } from 'next/og'

// Social share card. Uses the canon HCiHY palette from app/globals.css only —
// no new hues (see the palette note in globals.css).
export const alt = 'HCiHY Tech — IT Services & AI Consulting in Ventura County'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY = '#0a1f44'
const BLUE = '#0589ff'
const VOLT = '#a8ff00'
const CHROME = '#c0c6d4'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${BLUE}33 0%, ${NAVY} 60%)`,
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', fontSize: 160, fontWeight: 800, letterSpacing: -4 }}>
          <span style={{ color: BLUE }}>HC</span>
          <span style={{ color: VOLT }}>iHY</span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 8,
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: CHROME,
          }}
        >
          How Can I Help You?
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            fontSize: 46,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          IT Services &amp; AI Consulting in Ventura County
        </div>
      </div>
    ),
    size
  )
}
