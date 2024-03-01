export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Dasbod",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Budget",
      href: "/budget",
    },
    {
      title: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/shadcn/ui"
  },
}
