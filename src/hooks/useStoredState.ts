import { useEffect, useState } from "react";

export function useStoredState<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
      return validate(stored) ? stored : fallback;
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be disabled or full; preferences still work for this visit.
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export const isStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
export const isTheme = (value: unknown): value is "dark" | "light" =>
  value === "dark" || value === "light";
export const isView = (value: unknown): value is "grid" | "list" =>
  value === "grid" || value === "list";
