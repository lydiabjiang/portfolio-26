// All site copy lives here — edit this file to update the portfolio.
// Anything marked TODO is placeholder content to swap for your own.

export const site = {
  name: 'Lydia Jiang',
  initials: 'LJ',
  role: 'Product Designer',
  email: 'hello@lydiajiang.com', // TODO: your real email
  socials: [
    { label: 'LinkedIn', href: '#' }, // TODO
    { label: 'Read.cv', href: '#' }, // TODO
    { label: 'Dribbble', href: '#' }, // TODO
  ],
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Services', href: '#services' },
]

export const hero = {
  eyebrow: ['Product designer', 'UX, UI & design systems'],
  // Wrap one word in *asterisks* to render it as interactive particles.
  lines: ['I help teams *shape*', 'ideas into products people love.'],
  intro:
    "I'm Lydia — I turn complex problems into clear, considered experiences, from early research to polished, shipped UI.",
}

export const marquee = [
  'End-to-end product design',
  'Design systems that scale',
  'User research & usability testing',
  'Prototyping in Figma and code',
  'Accessibility from day one',
]

// TODO: replace with your real case studies.
// visual: 'dashboard' | 'mobile' | 'system'
// accent: 'purple' | 'yellow' | 'neutral'
export const projects = [
  {
    title: 'Rethinking analytics for small business owners',
    outcome: '— turning a cluttered dashboard into answers at a glance.',
    tags: ['SaaS', 'Dashboard', 'UX research', 'Data viz'],
    visual: 'dashboard',
    accent: 'purple',
    href: '#',
  },
  {
    title: 'A calmer onboarding for a personal finance app',
    outcome: '— from sign-up to first insight in a handful of taps.',
    tags: ['Mobile', 'Onboarding', 'Product strategy'],
    visual: 'mobile',
    accent: 'yellow',
    href: '#',
  },
  {
    title: 'A shared design system for a growing product team',
    outcome: '— one source of truth for designers and engineers.',
    tags: ['Design systems', 'Accessibility', 'Documentation'],
    visual: 'system',
    accent: 'neutral',
    href: '#',
  },
]

export const principles = [
  {
    title: 'I start with the problem, not the pixels.',
    body: 'Before anything gets designed, I dig into the goals, the people using it, and what success actually looks like.',
  },
  {
    title: 'I show my thinking early and often.',
    body: 'Rough sketches, quick prototypes, open critiques — feedback is cheapest before anything is polished.',
  },
  {
    title: 'I design with engineering, not for it.',
    body: 'Close collaboration with developers means fewer surprises, realistic scope, and details that survive to production.',
  },
  {
    title: 'I sweat the details that people feel.',
    body: 'Microcopy, states, motion, accessibility — the small things that make a product feel trustworthy.',
  },
]

export const services = [
  {
    tone: 'purple',
    eyebrow: 'Product design',
    title: 'From fuzzy problem to shipped product',
    body: 'Discovery, user flows, interaction design and high-fidelity UI — taking ideas from a whiteboard to something real people can use.',
    cta: 'See my work',
    href: '#work',
  },
  {
    tone: 'yellow',
    eyebrow: 'Systems & research',
    title: 'Foundations that help teams move faster',
    body: 'Design systems, component libraries and research programs that keep products consistent as they grow.',
    cta: 'Get in touch',
    href: '#contact',
  },
]

export const contact = {
  eyebrow: "What's next",
  // Same *asterisk* syntax as the hero.
  line: "Have an idea? Let's *talk*.",
  body: "I'm open to full-time roles and select freelance projects. I'd love to hear what you're building.",
}
