export const navigation = [
  { label: "Vision", href: "/vision" },
  { label: "About", href: "/about" },
  { label: "Productions", href: "/productions" },
  { label: "Services", href: "/services" },
  { label: "Four Quarters", href: "/four-quarters" },
] as const;

export const productions = [
  {
    slug: "manhood",
    title: "Manhood",
    description:
      "An original OZ Visions production being developed as part of the studio’s first independent slate.",
  },
  {
    slug: "exegesis",
    title: "Exegesis",
    description:
      "An independent title in development, shaped through the studio’s story-first production process.",
  },
  {
    slug: "ideophobia",
    title: "Ideophobia",
    description:
      "An original production currently moving through early creative development at OZ Visions.",
  },
  {
    slug: "the-primus-voyage",
    title: "The Primus Voyage",
    description:
      "A developing independent project within the growing OZ Visions catalog.",
  },
] as const;

export const services = [
  {
    title: "Creative production",
    description:
      "Concept development, planning, production, and delivery shaped around the story and audience.",
  },
  {
    title: "Media production",
    description:
      "Focused video and media work for campaigns, organizations, artists, and collaborators.",
  },
  {
    title: "Podcast production",
    description:
      "Support for recorded conversations, from format and capture through post-production.",
  },
  {
    title: "Brand development",
    description:
      "Narrative, visual direction, and practical brand systems built around a clear point of view.",
  },
  {
    title: "Consulting",
    description:
      "Creative and production guidance for teams defining a project, process, or next step.",
  },
  {
    title: "Event coverage",
    description:
      "Deliberate, story-aware coverage for live events and cultural moments.",
  },
  {
    title: "Custom services",
    description:
      "Flexible production support assembled around the specific needs of the brief.",
  },
] as const;

export function getProduction(slug: string) {
  return productions.find((production) => production.slug === slug);
}
