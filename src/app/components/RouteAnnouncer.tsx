import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  // RootLayout stays mounted while child routes render their error boundary.
  const previousPath = useRef(pathname);
  useEffect(() => {
    const heading =
      document.querySelector("main h1")?.textContent ?? "Products";
    document.title = `${heading} | React Router Product Demo`;
    if (previousPath.current !== pathname) {
      document.getElementById("main-content")?.focus();
    }
    previousPath.current = pathname;
  }, [pathname]);
  return null;
}
