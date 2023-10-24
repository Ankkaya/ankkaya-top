export const useSiteNavLinks = () =>
  useState("site-nav-links", () => [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/blog",
      text: "Blog",
    },
    {
      path: "/other",
      text: "Other",
    },
    {
      path: "/about",
      text: "About",
    },
  ]);
