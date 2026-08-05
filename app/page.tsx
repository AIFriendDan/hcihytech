import HchyHero from './components/HchyHero'
import HchyAbout from './components/HchyAbout'
import OurPhilosophy from './components/OurPhilosophy'
import WebDesignPackages from './components/WebDesignPackages'
import AiServices from './components/AiServices'
import SocialMediaServices from './components/SocialMediaServices'
import ItServices from './components/ItServices'
import WhyChooseUs from './components/WhyChooseUs'
import HchyContactCta from './components/HchyContactCta'

export default function HchyLandingPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'HCiHY Tech',
    url: 'https://hcihytech.com',
    description:
      'IT services, AI consulting, automation, and web solutions for Ventura County businesses.',
    areaServed: [
      'Ventura County',
      'Ventura',
      'Oxnard',
      'Camarillo',
      'Santa Barbara',
    ],
    serviceType: [
      'IT Support',
      'Managed IT Services',
      'AI Consulting',
      'Automation Consulting',
      'Web Development',
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <HchyHero />
      <HchyAbout />
      <OurPhilosophy />
      <WebDesignPackages />
      <AiServices />
      <SocialMediaServices />
      <ItServices />
      <WhyChooseUs />
      <HchyContactCta />
    </div>
  )
}
