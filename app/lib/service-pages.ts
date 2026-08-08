export interface Faq {
  q: string
  a: string
}

export interface ServicePage {
  slug: string
  navLabel: string
  /** Keyword-rich H1 for the dedicated route */
  h1: string
  /** <title> — aim for 50-60 chars before the brand suffix */
  title: string
  /** meta description — aim for 150-160 chars */
  description: string
  /** Lead paragraph under the H1 */
  intro: string
  /** schema.org Service.serviceType */
  serviceType: string
  /** Lowest advertised price, for Offer schema */
  priceFrom: string
  faqs: Faq[]
}

export const SITE_URL = 'https://hcihytech.com'

export const servicePages: ServicePage[] = [
  {
    slug: 'web-design',
    navLabel: 'Web Design',
    h1: 'Web Design in Ventura County',
    title: 'Web Design Ventura County | Small Business Websites',
    description:
      'Custom small business web design in Ventura County from $1,200. Mobile-responsive, SEO-ready sites for contractors and local pros. Get a free quote.',
    intro:
      'Fast, mobile-responsive websites built for Ventura County small businesses, contractors, and service professionals. Flat pricing, no monthly lock-in, and you own the site when it ships.',
    serviceType: 'Web design and development',
    priceFrom: '1200',
    faqs: [
      {
        q: 'How much does a small business website cost in Ventura County?',
        a: 'HCiHY Tech web design packages start at $1,200 for a 5-7 page Basic site and go up to $3,500 for a Premium build with e-commerce or online booking. The Contractor package is $1,500 and the most popular Professional package is $2,200. Pricing is flat, not hourly.',
      },
      {
        q: 'How long does it take to build the website?',
        a: 'The Basic package delivers in 5-7 business days. Larger builds take longer depending on page count and how quickly content and photos come back from you.',
      },
      {
        q: 'Do I own the website when it is finished?',
        a: 'Yes. You own the site, the domain, and the content outright. There is no monthly platform fee and no proprietary builder holding your site hostage.',
      },
      {
        q: 'Do you build websites for contractors and trades?',
        a: 'Yes. The $1,500 Contractor package is built for trades and service pros, including a service area map, before and after photo showcase, free quote request form, click-to-call mobile buttons, license display, and local SEO setup.',
      },
      {
        q: 'Is SEO included?',
        a: 'Basic SEO setup is included in every package. The Professional and Premium packages add advanced SEO, schema markup, and Google Analytics configuration.',
      },
    ],
  },
  {
    slug: 'ai-consulting',
    navLabel: 'AI Consulting',
    h1: 'AI Consulting & Automation for Ventura County Businesses',
    title: 'AI Consulting Ventura County | Business AI Automation',
    description:
      'AI consulting and workflow automation for Ventura County businesses. Chatbots, document automation, and custom AI assistants from $499. Free consultation.',
    intro:
      'Practical AI for local businesses, without the jargon. We automate the repetitive work, deploy customer service chatbots, and build custom assistants that actually fit how your business already runs.',
    serviceType: 'AI consulting and business process automation',
    priceFrom: '499',
    faqs: [
      {
        q: 'What does AI consulting actually do for a small business?',
        a: 'It removes repetitive work. Common wins are automated email triage, document digitization, a 24/7 customer service chatbot, smart scheduling, and AI lead scoring wired into your CRM. The goal is fewer hours spent on admin, not a science project.',
      },
      {
        q: 'How much does AI consulting cost?',
        a: 'The AI Starter package is $499 and covers email automation, digitizing 100 documents, one custom workflow, and a 2-hour training session. AI Growth is $1,299 and AI Enterprise is $2,999 for full custom GPT or Claude assistants, CRM integration, and unlimited automations.',
      },
      {
        q: 'Do I need technical staff to use this?',
        a: 'No. Every package includes hands-on training, 2 to 4 hours depending on tier, plus 30 to 90 days of post-launch support. The systems are built to be run by the people already doing the work.',
      },
      {
        q: 'Which AI tools do you build on?',
        a: 'Primarily Claude and GPT for assistants and content, plus automation platforms that connect to the tools you already use. Tool choice follows the business problem, not the other way around.',
      },
      {
        q: 'Do you work with businesses outside Ventura County?',
        a: 'Yes. AI consulting work is delivered remotely, so location is flexible. Onsite IT support is where the Ventura County service area matters.',
      },
    ],
  },
  {
    slug: 'it-services',
    navLabel: 'IT Services',
    h1: 'IT Services & Tech Support in Ventura County',
    title: 'IT Services Ventura County | Remote & Onsite Support',
    description:
      'Reliable IT support for Ventura County homes and businesses. Remote at $85/hr, onsite at $115/hr, or save with a monthly package. 15+ years experience.',
    intro:
      'Fast, reliable tech support for homes and businesses across Ventura County. Backed by 15+ years of enterprise IT experience across Level 1 through Level 3 support, lead, and management roles.',
    serviceType: 'IT support and managed technology services',
    priceFrom: '85',
    faqs: [
      {
        q: 'How much does IT support cost?',
        a: 'Remote support is $85 per hour and onsite support is $115 per hour. Monthly packages bring the effective rate down for businesses that need ongoing coverage.',
      },
      {
        q: 'Do you come onsite in Ventura County?',
        a: 'Yes. Onsite support covers Ventura, Oxnard, Camarillo, Thousand Oaks, Simi Valley, and the surrounding areas at $115 per hour.',
      },
      {
        q: 'What kind of IT problems do you handle?',
        a: 'Network setup and troubleshooting, workstation and server support, email and account issues, backup and recovery, hardware procurement, and general technology consulting for small businesses and home offices.',
      },
      {
        q: 'What are your qualifications?',
        a: 'Dan Garza has been in tech since 2006 and at the enterprise level since 2015, working Level 1, Level 2, and Level 3 support plus lead and manager roles. He holds a B.A. in Information Technology and an MBA in Leadership and Finance.',
      },
      {
        q: 'Do you support home users or only businesses?',
        a: 'Both. Home users and small businesses get the same rates and the same response.',
      },
    ],
  },
  {
    slug: 'social-media',
    navLabel: 'Social Media',
    h1: 'Social Media Management for Ventura County Businesses',
    title: 'Social Media Management Ventura County | Done-For-You',
    description:
      'Social media management and content creation for Ventura County businesses. Branded carousels, monthly content systems, and done-for-you posting from $497.',
    intro:
      'Branded social content that looks like it came from a real agency, built for local businesses that do not have time to post. From a one-time brand setup to fully done-for-you monthly management.',
    serviceType: 'Social media management and content creation',
    priceFrom: '497',
    faqs: [
      {
        q: 'How much does social media management cost?',
        a: 'The Starter package is $497 for brand setup plus one custom carousel. Growth is $997 per month for a monthly content system with 4 carousels. VIP is $1,997 per month for fully done-for-you content management.',
      },
      {
        q: 'Which platforms do you cover?',
        a: 'Content is exported platform-ready for Instagram, Facebook, and LinkedIn.',
      },
      {
        q: 'Do you write the captions too?',
        a: 'Yes. The Growth and VIP packages include written captions alongside the designed carousels, matched to your brand voice.',
      },
      {
        q: 'Can I start small and scale up?',
        a: 'Yes. Most clients start with the $497 Starter package to establish the brand look, then move to a monthly plan once they see the content performing.',
      },
    ],
  },
]

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((p) => p.slug === slug)
}
