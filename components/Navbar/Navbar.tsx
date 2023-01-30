/* eslint-disable @next/next/no-img-element */
import { Cart } from "components";
import { useStateContext } from "context/stateContext";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";

type Props = {};

const Navbar = (props: Props) => {
  const { qty, showCart, setShowCart } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">
          <img src="/logo.png" alt="" style={{ cursor: "pointer" }} />
        </Link>
      </div>

      <button className="cart-icon" onClick={setShowCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{qty}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
