import React, { Fragment, useEffect } from "react";
import "./OrderDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../component/layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../../redux/actions/orderAction";
import Loader from "../../../component/Loader/Loader";
import Error from "../../../component/Error/Error";

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const { id } = useParams()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, id]);
    return (

        loading ? <Loader /> :
            <>
                <MetaData title="SİPARİŞ DETAYLARI" />
                {error && <Error error={error} clearErrors={clearErrors} />}
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <p component="h1">
                            Sipariş #{order && order._id}
                        </p>
                        <p>Adres Bilgisi</p>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>Ad:</p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Telefon:</p>
                                <span>
                                    {order.shippingInfo && order.shippingInfo.phoneNo}
                                </span>
                            </div>
                            <div>
                                <p>Adres:</p>
                                <span>
                                    {order.shippingInfo &&
                                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                </span>
                            </div>
                        </div>
                        <p>Ödeme</p>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.paymentInfo &&
                                            order.paymentInfo.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.paymentInfo && order.paymentInfo.status === "succeeded"
                                        ? "ÖDENDİ"
                                        : "ÖDENMEDİ"}
                                </p>
                            </div>

                            <div>
                                <p>Toplam:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>

                        <p>Sipariş Durumu</p>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order.orderStatus && order.orderStatus === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <p>Siparişler:</p>
                        <div className="orderDetailsCartItemsContainer">
                            {order.orderItems && order.orderItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ₺{item.price}
                                        <b>₺{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>

    );
};

export default OrderDetails;