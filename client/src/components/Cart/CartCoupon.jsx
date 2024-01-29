import { useContext, useState } from "react";
import { message } from "antd";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");

  const { cartItems, setCartItems } = useContext(CartContext);

  const apiUrl = process.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.error("Boş değer girilemez!");
    }

    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!response.ok) {
        message.error(`${couponCode} adında bir kupon kodu bulunamadı!`);
        return;
      }

      console.log("Response: ", response);

      const data = await response.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updatedCartItems);

      message.success(`${couponCode} kupon kodu başarıyla uygulandı`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="coupon">
      <input
        type="text"
        className="input-text"
        placeholder="Coupon code"
        onChange={(e) => setCouponCode(e.target.value)}
        value={couponCode}
      />
      <button className="btn" type="button" onClick={applyCoupon}>
        Apply Coupon
      </button>
    </div>
  );
};

export default CartCoupon;
