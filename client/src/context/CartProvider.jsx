import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    // setCartItems([...cartItems, cartItem]); //! 1. yol
    setCartItems((prevCart) => [
      ...prevCart,
      {
        ...cartItem,
        quantity: cartItem.quantity ? cartItem.quantity : 1,
      },
    ]); //! 2. yol
  };

  const removeFromCart = (itemId) => {
    const filteredCartItems = cartItems.filter((cartItem) => {
      return cartItem._id !== itemId;
    });
    setCartItems(filteredCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        // ben bu value değerlerine her yerden ulaşabilirim.
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
