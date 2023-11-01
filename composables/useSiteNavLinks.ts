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
      path: "/category",
      text: "Category",
    },
    {
      path: "/about",
      text: "About",
    },
  ]);
