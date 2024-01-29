import { message } from "antd";
import "./search.css";
import { useState } from "react";

import { Link } from "react-router-dom";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);

  const apiUrl = process.env.VITE_API_BASE_URL;

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.error("Boş karakter giremezsiniz!");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/products/search/${productName}`);

      if (!res.ok) {
        message.error("Bir şeyler ters gitti.");
        return;
      }

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form" onSubmit={(e) => handleSearch(e)}>
          <input type="text" placeholder="Search a product" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${searchResults?.length === 0 ? "flex" : "grid"}`,
            }}
          >
            {searchResults?.length === 0 && (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                Aradığınız ürün bulunamadı
              </span>
            )}

            {searchResults?.length > 0 &&
              searchResults?.map((result) => (
                <Link
                  to={`product/${result._id}`}
                  className="result-item"
                  key={result._id}
                >
                  <img src={result.img[0]} className="search-thumb" alt="" />
                  <div className="search-info">
                    <h4> {result.name} </h4>
                    <span className="search-sku">SKU: PD0016</span>
                    <span className="search-price">
                      {result.price.current.toFixed(2)}₺
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal} />
    </div>
  );
};

export default Search;
