import { Link } from "react-router-dom";
import ProductArtwork from "../components/ProductArtwork";

export default function HomePage() {
  return (
    <section className="home-hero">
      <div className="home-copy">
        <p className="eyebrow">FORM / EVERYDAY OBJECTS</p>
        <h1>Welcome</h1>
        <p className="home-statement">
          Make room
          <br />
          for the <em>good things.</em>
        </p>
        <p className="intro">
          A considered collection for your desk, your ideas, and your everyday
          rituals.
        </p>
        <Link className="primary-link" to="/products">
          Explore the collection <span aria-hidden="true">↗</span>
        </Link>
        <p className="home-footnote">Simple objects. A fresh perspective.</p>
      </div>
      <div className="home-artwork">
        <ProductArtwork category="Stationery" />
        <span className="home-art-label">01 — A space for your next idea</span>
      </div>
    </section>
  );
}
