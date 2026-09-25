import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PRODUCTS } from "../../data/products";
import { isStringList, useStoredState } from "../../hooks/useStoredState";
import type { Product } from "../../types/product";
import { productUrl } from "../../utils/productUrl";
import ProductArtwork from "../components/ProductArtwork";

function ProductDetails({
  product,
  backUrl,
}: {
  product: Product;
  backUrl: string;
}) {
  const [favorites, setFavorites] = useStoredState(
    "catalog.favorites",
    [],
    isStringList,
  );
  const [, setRecent] = useStoredState("catalog.recent", [], isStringList);
  const [copyStatus, setCopyStatus] = useState("");
  const [copyFailed, setCopyFailed] = useState(false);
  const url = productUrl(product.id, window.location.origin);
  useEffect(() => {
    setRecent((current) =>
      [product.id, ...current.filter((id) => id !== product.id)].slice(0, 4),
    );
  }, [product.id, setRecent]);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyFailed(false);
      setCopyStatus("Link copied.");
    } catch {
      setCopyFailed(true);
      setCopyStatus("Copy is unavailable. Select and copy the link below.");
    }
  };
  return (
    <section className="product-detail">
      <div className="detail-artwork">
        <ProductArtwork category={product.category} />
      </div>
      <div className="detail-copy">
        <p className="eyebrow">THE EVERYDAY COLLECTION</p>
        <h1>Product Details</h1>
        <span className="category-badge">{product.category}</span>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="detail-actions">
          <button
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
          <button type="button" onClick={copyLink}>
            Copy product link
          </button>
        </div>
        <p role="status">{copyStatus}</p>
        {copyFailed && (
          <label className="field">
            Product link
            <input
              readOnly
              value={url}
              onFocus={(event) => event.target.select()}
            />
          </label>
        )}
        <p>
          <Link to={backUrl}>Back</Link>
        </p>
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const product = PRODUCTS.find((item) => item.id === productId);
  const backUrl = `/products${searchParams.size ? `?${searchParams}` : ""}`;
  if (!product)
    return (
      <section>
        <h1>Product not found</h1>
        <p>This product is not in the catalog.</p>
        <Link to={backUrl}>Browse products</Link>
      </section>
    );
  return (
    <ProductDetails key={product.id} product={product} backUrl={backUrl} />
  );
}
