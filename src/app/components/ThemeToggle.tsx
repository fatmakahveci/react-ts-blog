import { useEffect } from "react";
import { isTheme, useStoredState } from "../../hooks/useStoredState";

export default function ThemeToggle() {
  const [theme, setTheme] = useStoredState("catalog.theme", "dark", isTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Light theme"
      aria-pressed={theme === "light"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light theme" : "Dark theme"}
    </button>
  );
}
