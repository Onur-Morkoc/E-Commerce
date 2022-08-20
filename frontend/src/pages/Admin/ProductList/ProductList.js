import React, { Fragment, useEffect } from "react";
import "./ProductList.scss";
import "../../Order/MyOrders/MyOrders.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getAdminProduct, clearErrors } from "../../../redux/actions/productAction";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/SideBar";
import { DELETE_PRODUCT_RESET } from "../../../redux/actionTypes/productType";
import MetaData from "../../../component/layout/MetaData";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md"
import Error from "../../../component/Error/Error";

const ProductList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));

    };

    useEffect(() => {

        if (isDeleted) {
            navigate("/admin/dashboard", { replace: true });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, navigate, isDeleted]);

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <>
                <MetaData title={`TÜM ÜRÜNLER - Yönetici`} />

                <div className="container1">
                <Sidebar />
                    <div className="container2">
                    
                        <div className="myOrdersPage">
                           
                            {error && <Error error={error} clearErrors={clearErrors} />}
                            <p id="myOrdersHeading"> Tüm Ürünler</p>
                            <table>
                                <thead>
                                    <th>Ürün Kimliği</th>
                                    <th>Ad</th>
                                    <th>Stok</th>
                                    <th>Fiyat</th>
                                    <th>İşlemler</th>
                                </thead>
                                <tbody>
                                    {rows.map(product => {
                                        return <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td className={product.stock === 0 ? "redColor" : "greenColor"}>{product.stock}</td>
                                            <td>₺{product.price}</td>
                                            <td>
                                                <NavLink className="edit" to={`/admin/product/${product.id}`}>
                                                    <MdOutlineModeEditOutline />
                                                </NavLink>
                                                <span className="delete" onClick={deleteProductHandler}>
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
            </>


        </Fragment>
    );
};

export default ProductList;