import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
} from "../../../redux/actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineAccountTree } from "react-icons/md"
import "./ProcessOrder.scss";
import MetaData from "../../../component/layout/MetaData";
import Sidebar from "../Sidebar/SideBar";
import Loader from "../../../component/Loader/Loader";
import { UPDATE_ORDER_RESET } from "../../../redux/actionTypes/orderType";

const ProcessOrder = ({ match }) => {

    const { id } = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (isUpdated) {

            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, id, isUpdated]);

    return (
        <Fragment>
            <MetaData title="SİPARİS SÜRECİ" />
            <div className="container1">
                <Sidebar />
                <div className="container2">
                    <div className="dashboard">

                        <div className="newProductContainer">
                            {loading ? (
                                <Loader />
                            ) : (
                                <div
                                    className="confirmOrderPage"
                                    style={{
                                        display: order.orderStatus === "Delivered" ? "block" : "grid",
                                    }}
                                >
                                    <div>
                                        <div className="confirmshippingArea">
                                            <span>Adres Bilgisi</span>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <span>Ad:</span>
                                                    <span>{order.user && order.user.name}</span>
                                                </div>
                                                <div>
                                                    <span>Telefon:</span>
                                                    <span>
                                                        {order.shippingInfo && order.shippingInfo.phoneNo}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span>Adres:</span>
                                                    <span>
                                                        {order.shippingInfo &&
                                                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                                    </span>
                                                </div>
                                            </div>

                                            <span>Ödeme</span>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <span
                                                        className={
                                                            order.paymentInfo &&
                                                                order.paymentInfo.status === "succeeded"
                                                                ? "greenColor"
                                                                : "redColor"
                                                        }
                                                    >
                                                        {order.paymentInfo &&
                                                            order.paymentInfo.status === "succeeded"
                                                            ? "ÖDENDİ"
                                                            : "ÖDENMEDİ"}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span>Toplam:</span>
                                                    <span>{order.totalPrice && order.totalPrice}</span>
                                                </div>
                                            </div>

                                            <span>Sipariş Durumu</span>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <span
                                                        className={
                                                            order.orderStatus && order.orderStatus === "Delivered"
                                                                ? "greenColor"
                                                                : "redColor"
                                                        }
                                                    >
                                                        {order.orderStatus && order.orderStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="confirmCartItems">
                                            <span>Sepetinizdeki Ürünler:</span>
                                            <div className="confirmCartItemsContainer">
                                                {order.orderItems &&
                                                    order.orderItems.map((item) => (
                                                        <div key={item.product}>
                                                            <img src={item.image} alt="Ürün" />
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                            <span>
                                                                {item.quantity} X ₹{item.price}
                                                                <b>₹{item.price * item.quantity}</b>
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div
                                        style={{
                                            display: order.orderStatus === "Delivered" ? "none" : "block",
                                        }}
                                    >
                                        <form
                                            className="updateOrderForm"
                                            onSubmit={updateOrderSubmitHandler}
                                        >
                                            <h1>Sipariş Süreci</h1>

                                            <div>
                                                <MdOutlineAccountTree />
                                                <select onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="">Kategori Seçin</option>
                                                    {order.orderStatus === "Processing" && (
                                                        <option value="Shipped">Teslim Edildi</option>
                                                    )}

                                                    {order.orderStatus === "Shipped" && (
                                                        <option value="Delivered">Delivered</option>
                                                    )}
                                                </select>
                                            </div>

                                            <input
                                                id="createProductBtn"
                                                defaultValue={`İşlen`}
                                                readOnly
                                                disabled={loading ? true : false || status === "" ? true : false}
                                            />

                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;