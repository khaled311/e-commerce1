/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { urlFor } from "lib/client";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "context/stateContext";
import getStripe from "lib/getStripe";
import { toast } from "react-hot-toast";

type Props = {};

const Cart = (props: Props) => {
  const cartRef = useRef<any>();
  const {
    setShowCart,
    qty,
    cartItems,
    totalPrice,
    onRemove,
    toggleCartItemQuanitity,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) {
      toast.error("Error");
    }

    const data = await response.json();
    toast.loading("Redirecting...");

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={setShowCart}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({qty} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            {/* <Link href="/"> */}
            <button type="button" onClick={setShowCart} className="btn">
              Continue Shopping
            </button>
            {/* </Link> */}
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item: any) => (
              <div className="product" key={item?._id}>
                <img
                  src={urlFor(item?.image[0]) as unknown as string}
                  className="cart-product-image"
                  alt={item?.name}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>

                        <span className="num">{item?.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item?._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
