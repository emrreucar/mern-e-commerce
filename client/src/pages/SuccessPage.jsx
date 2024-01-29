import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { useContext, useEffect } from "react";

const SuccessPage = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı!"
          extra={[
            <>
              <Link to={"/"} key="home">
                <Button type="primary">Ana Sayfa</Button>
              </Link>
              <a href="/admin/orders" key="home">
                <Button type="primary" key="buy">
                  Siparişlerim
                </Button>
              </a>
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
