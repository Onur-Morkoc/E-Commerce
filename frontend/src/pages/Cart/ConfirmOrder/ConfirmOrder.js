import React from "react";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../../../component/layout/MetaData";
import "./ConfirmOrder.scss";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {

    const navigate = useNavigate()

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate(`/process/payment`, { replace: true });

    };

    return (
        <>
            <MetaData title="SİPARİŞ ONAYLA" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <p>Adres Bilgileri</p>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Ad:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Telefon:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Adres:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <p>Sepetinizdeki Ürünler:</p>
                        <div className="confirmCartItemsContainer">
                            {cartItems && cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₺{item.price} ={" "}
                                            <b>₺{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderSummary">
                        <p>Şiparis Özeti</p>
                        <div>
                            <div>
                                <p>Toplam:</p>
                                <span>₺{subtotal}</span>
                            </div>
                            <div>
                                <p>Nakliye Ücreti:</p>
                                <span>₺{shippingCharges}</span>
                            </div>
                            <div>
                                <p>Mal ve Hizmet:</p>
                                <span>₺{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Toplam:</b>
                            </p>
                            <span>₺{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Ödemeye Devam Et</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;