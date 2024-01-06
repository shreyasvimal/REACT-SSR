import { useEffect, useState } from "react";
import Header from "./Header";
import ProductOverView from "./ProductOverView";
import { getProducts } from "../api";
import Swatch from "./Swatch";
import "./Product.css";

const Product = () => {
  const [data, setData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="product">
      <Header title={data?.headerText} />
      <ProductOverView product={selectedProduct || data?.products?.[0]}>
        <div className="swatches">
          {data?.products?.map((el, index) => {
            return (
              <Swatch
                swatchUrl={el.swatchUrl}
                index={index}
                handleClick={(index) => {
                  setSelectedProduct(data.products[index]);
                }}
              />
            );
          })}
        </div>
      </ProductOverView>
    </div>
  );
};

export default Product;
