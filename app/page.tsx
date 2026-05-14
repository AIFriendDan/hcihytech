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
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
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
