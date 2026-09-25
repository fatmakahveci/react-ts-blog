export default function ProductArtwork({ category }: { category: string }) {
  return (
    <div
      className={`product-art ${category === "Stationery" ? "paper-art" : "lamp-art"}`}
      aria-hidden="true"
    >
      <span className="art-orbit" />
      {category === "Stationery" ? (
        <div className="notebook">
          <span className="notebook-label">
            GOOD
            <br />
            IDEAS
            <br />
            <small>START HERE.</small>
          </span>
          <span className="notebook-band" />
        </div>
      ) : (
        <div className="desk-lamp">
          <span className="lamp-base" />
          <span className="lamp-stem" />
          <span className="lamp-shade" />
          <span className="lamp-glow" />
        </div>
      )}
      <span className="art-caption">THE EVERYDAY COLLECTION</span>
    </div>
  );
}
