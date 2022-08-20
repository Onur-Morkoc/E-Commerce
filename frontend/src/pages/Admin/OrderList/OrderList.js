import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../../../component/layout/MetaData";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md"
import SideBar from "../Sidebar/SideBar";
import {
    deleteOrder,
    getAllOrders,
    clearErrors,
} from "../../../redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../redux/actionTypes/orderType";
import "../../Order/MyOrders/MyOrders.scss"
import Error from "../../../component/Error/Error";


const OrderList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {

        if (isDeleted) {
            navigate("/admin/orders", { replace: true });
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, navigate, isDeleted]);

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`TÜM SİPARİŞLER - YÖNETİCİ`} />
            <div className="container1">
                <div className="container2">

                    <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer">
                            <div className="myOrdersPage">
                                {error && <Error error={error} clearErrors={clearErrors} />}
                                <p id="myOrdersHeading">Tüm Siparisler</p>
                                <table>
                                    <thead>
                                        <th>Order ID</th>
                                        <th>Status</th>
                                        <th>Items Qty</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </thead>
                                    <tbody>
                                        {rows.map(order => {
                                            return <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td className={order.status === "Processing" ? "redColor" : "greenColor"}>{order.status}</td>
                                                <td>{order.itemsQty}</td>
                                                <td>{order.amount}</td>
                                                <td>
                                                    <NavLink className="edit" to={`/admin/order/${order.id}`}>
                                                        <MdOutlineModeEditOutline />
                                                    </NavLink>
                                                    <span className="delete" onClick={deleteOrderHandler}>
                                                        <MdOutlineDelete />
                                                    </span>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;