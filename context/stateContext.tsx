import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const Context = createContext(null as any);

interface IOurState {
  showCart: boolean;
  cartItems: any[];
  totalPrice: number;
  totalQuantity: number;
  qty: number;
}

export const ourState: IOurState = {
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantity: 0,
  qty: 0,
};

export const StateContext = ({ children }: any) => {
  const [state, setState] = useState(ourState);

  const addToCart = (product: any, quantity: any) => {
    const checkProductInCart = state.cartItems.some(
      (item: any) => item?._id === product?._id
    );

    if (quantity === 0) {
      toast.error(`Quantity can't be 0`);
      return;
    }

    if (checkProductInCart) {
      setState((prev: any) => ({
        ...prev,
        cartItems: [
          ...prev.cartItems.filter((item: any) => item._id != product._id),
          {
            ...product,
            quantity:
              prev.cartItems.filter((item: any) => item._id == product._id)[0]
                .quantity + quantity,
          },
        ],
        totalPrice: prev.totalPrice + product.price * quantity,
        totalQuantity: prev.totalQuantity + quantity,
      }));
    } else {
      setState((prev: any) => ({
        ...prev,
        cartItems: [...prev.cartItems, { ...product, quantity: quantity }],
        totalPrice: prev.totalPrice + product.price * quantity,
        totalQuantity: prev.totalQuantity + 1,
      }));
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
    setState((prev) => ({
      ...prev,
      qty: prev.cartItems?.length,
    }));
  };

  const setShowCart = () => {
    setState((prev: any) => ({
      ...prev,
      showCart: prev.showCart === false ? true : false,
    }));
  };

  const onRemove = (product: any) => {
    setState((prev: any) => ({
      ...prev,
      cartItems: prev.cartItems.filter(
        (item: any) => item?._id !== product?._id
      ),
      totalPrice: prev.totalPrice - product.price * product.quantity,
      totalQuantity: prev.totalQuantity - 1,
      qty: prev.qty - 1,
    }));
  };

  const toggleCartItemQuanitity = (
    itemId: number | string,
    operation: "dec" | "inc"
  ) => {
    const ourPro = state.cartItems.filter(
      (item: any) => item._id === itemId
    )[0];

    console.log("operation", operation);

    if (ourPro?.quantity === 1 && operation === "dec") {
      onRemove(ourPro);
    } else {
      setState((prev: any) => ({
        ...prev,
        cartItems: prev.cartItems.map((item: any) =>
          item._id === itemId
            ? {
                ...item,
                quantity:
                  operation === "dec" ? item?.quantity - 1 : item?.quantity + 1,
              }
            : item
        ),
        totalPrice:
          operation === "dec"
            ? prev.totalPrice - ourPro.price
            : prev.totalPrice + ourPro.price,
      }));
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        addToCart,
        setShowCart,
        onRemove,
        toggleCartItemQuanitity,
        setState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
