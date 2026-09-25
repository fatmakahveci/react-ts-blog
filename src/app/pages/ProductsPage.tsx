import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import {
  isStringList,
  isView,
  useStoredState,
} from "../../hooks/useStoredState";

import ProductArtwork from "../components/ProductArtwork";

const categories = [...new Set(PRODUCTS.map((product) => product.category))];
const sorts = ["name", "price-asc", "price-desc"];
const price = (amount: number) => `$${amount.toFixed(2)}`;

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const [favorites, setFavorites] = useStoredState(
    "catalog.favorites",
    [],
    isStringList,
  );
  const [recent] = useStoredState("catalog.recent", [], isStringList);
  const [view, setView] = useStoredState("catalog.view", "grid", isView);
  const query = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const category = categories.includes(categoryParam) ? categoryParam : "";
  const sortParam = searchParams.get("sort") ?? "name";
  const sort = sorts.includes(sortParam) ? sortParam : "name";
  const rawMax = searchParams.get("max") ?? "";
  const max =
    rawMax.trim() !== "" &&
    Number.isFinite(Number(rawMax)) &&
    Number(rawMax) >= 0
      ? rawMax
      : "";
  const favoritesOnly = searchParams.get("favorites") === "1";
  const products = PRODUCTS.filter(
    (product) =>
      product.title.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!category || product.category === category) &&
      (!max || product.price <= Number(max)) &&
      (!favoritesOnly || favorites.includes(product.id)),
  ).sort((a, b) =>
    sort === "price-asc"
      ? a.price - b.price
      : sort === "price-desc"
        ? b.price - a.price
        : a.title.localeCompare(b.title),
  );
  const update = (key: string, value: string) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true, flushSync: true },
    );
  };
  const reset = () => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        for (const key of ["q", "category", "sort", "max", "favorites"])
          next.delete(key);
        return next;
      },
      { replace: true, flushSync: true },
    );
    searchInput.current?.focus();
  };
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.key !== "/" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        (target instanceof HTMLElement &&
          (target.closest("input, textarea, select") ||
            target.isContentEditable))
      )
        return;
      event.preventDefault();
      searchInput.current?.focus();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  const productUrl = (id: string) =>
    `/products/${id}${searchParams.size ? `?${searchParams}` : ""}`;
  const recentProducts = recent
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product) => product !== undefined)
    .slice(0, 4);
  return (
    <section>
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">THE EVERYDAY COLLECTION</p>
          <h1>
            Products
            <span className="heading-dot" aria-hidden="true">
              .
            </span>
          </h1>
          <p className="intro">Thoughtful objects for the way you live.</p>
        </div>
        <div className="collection-note">
          <span className="note-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            Small collection.
            <br />
            Endless possibilities.
          </span>
        </div>
      </div>
      <div className="catalog-controls">
        <div className="field search-field">
          <label htmlFor="product-search">
            Search products <kbd>/</kbd>
          </label>
          <input
            ref={searchInput}
            id="product-search"
            type="search"
            value={query}
            aria-keyshortcuts="/"
            placeholder="Find something good…"
            onChange={(event) => update("q", event.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                update("q", "");
                searchInput.current?.focus();
              }}
            >
              Clear search
            </button>
          )}
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => update("category", event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="max-price">Maximum price (USD)</label>
          <input
            id="max-price"
            type="number"
            min="0"
            step="0.01"
            placeholder="No limit"
            value={max}
            onChange={(event) => update("max", event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => update("sort", event.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="catalog-toolbar">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={favoritesOnly}
            onChange={(event) =>
              update("favorites", event.target.checked ? "1" : "")
            }
          />
          Favorites only
        </label>
        <button type="button" onClick={reset}>
          Reset filters
        </button>
        <fieldset className="view-controls" aria-label="Product view">
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            List
          </button>
        </fieldset>
      </div>
      <p className="results-count" role="status">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </p>
      {products.length > 0 ? (
        <ul aria-label="Product results" className={`product-list ${view}`}>
          {products.map((product) => (
            <li className="product-card" key={product.id}>
              <ProductArtwork category={product.category} />
              <div className="product-info">
                <span className="category-badge">{product.category}</span>
                <h2>
                  <Link to={productUrl(product.id)}>{product.title}</Link>
                </h2>
                <p>{product.description}</p>
                <strong>{price(product.price)}</strong>
              </div>
              <button
                className="favorite-button"
                type="button"
                aria-label={`Favorite ${product.title}`}
                aria-pressed={favorites.includes(product.id)}
                onClick={() =>
                  setFavorites((current) =>
                    current.includes(product.id)
                      ? current.filter((id) => id !== product.id)
                      : [...current, product.id],
                  )
                }
              >
                {favorites.includes(product.id) ? "Saved" : "Save favorite"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">
          No products match your search. Try another name or reset the filters.
        </p>
      )}
      {recentProducts.length > 0 && (
        <aside className="recent-products" aria-label="Recently viewed">
          <h2>Recently viewed</h2>
          <ul>
            {recentProducts.map((product) => (
              <li key={product.id}>
                <Link to={productUrl(product.id)}>{product.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
