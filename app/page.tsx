import HchyHero from './components/HchyHero'
import HchyAbout from './components/HchyAbout'
import WebDesignPackages from './components/WebDesignPackages'
import AiServices from './components/AiServices'
import ItServices from './components/ItServices'
import WhyChooseUs from './components/WhyChooseUs'
import HchyContactCta from './components/HchyContactCta'

export default function HchyLandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <HchyHero />
      <HchyAbout />
      <WebDesignPackages />
      <AiServices />
      <ItServices />
      <WhyChooseUs />
      <HchyContactCta />
    </div>
  )
}
