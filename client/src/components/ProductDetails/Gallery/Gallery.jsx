import React, { useEffect, useState } from "react";
import Slider from "react-slick";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{ zIndex: "2", fontSize: "40px", marginLeft: "10px" }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{ zIndex: "2", fontSize: "40px", marginRight: "10px" }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState(singleProduct.img[0]);

  useEffect(() => {
    setActiveImg(singleProduct.img[0]);
  }, [singleProduct.img]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        {/* big image */}
        <img src={`${activeImg}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {/* small images */}
              {singleProduct.img.map((itemImg, index) => (
                <li
                  className="glide__slide glide__slide--active"
                  key={index}
                  onClick={() => setActiveImg(itemImg)}
                >
                  <img
                    src={`${itemImg}`}
                    alt=""
                    className={`img-fluid ${
                      activeImg === itemImg && "active"
                    } `}
                  />
                </li>
              ))}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
};

export default Gallery;
