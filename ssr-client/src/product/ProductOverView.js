const ProductOverView = ({ product, children }) => {
  if (!product) return null;
  return (
    <article className="product-preview">
      {/* TODO: make DRY with a ProductImage component */}
      {product.image && <img src={product.image} alt="Home Depot logo" />}
      <section className="product-preview-details">
        {product.brand && (
          <p>
            <b>{product.brand}</b>
          </p>
        )}
        {product.description && <p>{product.description}</p>}
      </section>
      {children}
    </article>
  );
};

export default ProductOverView;
