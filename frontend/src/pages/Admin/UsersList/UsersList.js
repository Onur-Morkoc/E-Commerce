import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/SideBar";
import MetaData from "../../../component/layout/MetaData";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md"
import Error from "../../../component/Error/Error";
import { DELETE_USER_RESET } from "../../../redux/actionTypes/userType";
import { getAllUsers, clearErrors, deleteUser } from "../../../redux/actions/userAction";
import "../../Order/MyOrders/MyOrders.scss"

const UsersList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { error, users } = useSelector((state) => state.allUsers);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {

        if (isDeleted) {
            navigate("/admin/users", { replace: true });
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, navigate, isDeleted, message]);


    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <Fragment>
            <MetaData title={`TÜM KULLANICILAR - YÖNETİCİ`} />
            <div className="container1">
                <Sidebar />
                <div className="container2">
                    <div className="dashboard">

                        <div className="productListContainer">
                            <div className="myOrdersPage">
                                {error && <Error error={error} clearErrors={clearErrors} />}
                                <p id="myOrdersHeading"> Tüm Kullanıcılar</p>
                                <table>
                                    <thead>
                                        <th>Kullanıcı kimliği</th>
                                        <th>E-posta</th>
                                        <th>Ad</th>
                                        <th>Rol</th>
                                        <th>Eylemler</th>
                                    </thead>
                                    <tbody>
                                        {rows.map(user => {
                                            return <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td className={user.role === "Admin" ? "redColor" : "greenColor"}>{user.role}</td>
                                                <td>
                                                    <NavLink className="edit" to={`/admin/user/${user.id}`}>
                                                        <MdOutlineModeEditOutline />
                                                    </NavLink>
                                                    <span className="delete" onClick={deleteUserHandler}>
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

export default UsersList;