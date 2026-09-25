export function productUrl(id: string, origin: string): string {
  const routePrefix = import.meta.env.VITE_ROUTER_MODE === "hash" ? "#/" : "";
  return new URL(
    `${import.meta.env.BASE_URL}${routePrefix}products/${encodeURIComponent(id)}`,
    origin,
  ).href;
}
