import React from "react";
import "./productDetails.css";
import BreadCrumb from "./BreadCrumb/BreadCrumb";
import Gallery from "./Gallery/Gallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import Tabs from "./Tabs/Tabs";

const ProductDetails = ({ singleProduct, setSingleProduct }) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <BreadCrumb />

          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct} />
              <ProductInfo singleProduct={singleProduct} />
            </main>
          </div>
          <Tabs
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
