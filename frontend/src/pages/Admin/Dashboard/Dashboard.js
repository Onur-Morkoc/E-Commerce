import React, { useEffect } from "react";
import Sidebar from "../Sidebar/SideBar";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../../redux/actions/orderAction";
import { getAllUsers } from "../../../redux/actions/userAction";
import { getAdminProduct } from "../../../redux/actions/productAction";
import MetaData from "../../../component/layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });



  return (
    <div className="container1">
    <div className="container2">
    <div className="dashboard">
      <MetaData title="Dashboard - Yönetici Panel" />
      <Sidebar />
      <div className="dashboardContainer">
        <h1 >Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
            Toplam Tutar <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Ürün</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Siparişler</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Kullanıcılar</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>


      </div>
    </div>
    </div>
  </div>

  );
};

export default Dashboard;