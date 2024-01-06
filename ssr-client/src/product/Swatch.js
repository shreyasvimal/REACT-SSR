const Swatch = ({ swatchUrl, handleClick, index }) => {
  if (!swatchUrl) return null;

  const selectedClass = ""; //classNames({'product-swatch--current': props.isCurrent});

  return (
    <span className="product-swatch">
      <img
        className={selectedClass}
        src={swatchUrl}
        alt="product"
        onClick={() => handleClick(index)}
      />
    </span>
  );
};

export default Swatch;
