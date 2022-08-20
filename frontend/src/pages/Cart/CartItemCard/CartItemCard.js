import React from "react";
import "./CartItemCard.scss";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="Ürün Resmi" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Fiyat: ₺${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Sil</p>
      </div>
    </div>
  );
};

export default CartItemCard;