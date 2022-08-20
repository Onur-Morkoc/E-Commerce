import React from "react";
import {MdCheckCircleOutline} from "react-icons/md";
import "./OrderSuccess.scss";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MdCheckCircleOutline />

      <p>Siparişiniz Başarıyla Alındı</p>
      <Link to="/orders">Siparişleri Görüntüle</Link>
    </div>
  );
};

export default OrderSuccess;