import { useState } from "react";
import Reviews from "../../Reviews/Reviews";

const Tabs = ({ singleProduct, setSingleProduct }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            className={`tab-button ${activeTab === "desc" && "active"} `}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            className={`tab-button ${activeTab === "info" && "active"} `}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            className={`tab-button ${activeTab === "reviews" && "active"} `}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" && "active"
          }`}
          id="desc"
        >
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          ></div>
        </div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" && "active"
          } `}
          id="info"
        >
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td style={{ display: "flex", gap: "5px" }}>
                  {singleProduct.colors.map((color, index) => (
                    <p key={index}>
                      {color.toUpperCase()}
                      {index < singleProduct.sizes.length - 1 && ", "}
                    </p>
                  ))}
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td style={{ display: "flex", gap: "5px" }}>
                  {singleProduct.sizes.map((size, index) => (
                    <span key={index}>
                      {size.toUpperCase()}
                      {index < singleProduct.sizes.length - 1 && ", "}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews
          active={activeTab === "reviews" ? "content active" : "content"}
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Tabs;
