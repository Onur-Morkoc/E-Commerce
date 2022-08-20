import React, { useEffect } from "react";
import "./MyOrders.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../redux/actions/orderAction";
import Loader from '../../../component/Loader/Loader'
import { Link } from "react-router-dom";
import MetaData from "../../../component/layout/MetaData";
import { MdLaunch } from "react-icons/md";
import Error from "../../../component/Error/Error";

const MyOrders = () => {

    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const { user } = useSelector((state) => state.user);

    const rows = [];

    orders && orders.forEach((item, index) => {

        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });

    useEffect(() => {
        dispatch(myOrders());

    }, [dispatch, error]);

    return (


        loading ? <Loader /> :
            <>
                <MetaData title={`${user.name} - Siparişi`} />
                <div className="myOrdersPage">
                    {error && <Error error={error} clearErrors={clearErrors} />}
                    <p id="myOrdersHeading">{user.name} Siparişleri</p>
                    <table>
                        <thead>
                            <th>Sipariş ID</th>
                            <th>Durum</th>
                            <th>Ürün Adeti</th>
                            <th>Tutar</th>
                            <th>Ayrıntı</th>
                        </thead>
                        <tbody>

                            {rows.map(order => {
                                return <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td className={order.status==="Processing"?"redColor":"greenColor"}>{order.status}</td>
                                    <td>{order.itemsQty}</td>
                                    <td>₺{order.amount}</td>
                                    <td>
                                        <Link to={`/order/${order.id}`}>
                                            <MdLaunch />
                                        </Link>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>


                </div>
            </>



    );
};

export default MyOrders;