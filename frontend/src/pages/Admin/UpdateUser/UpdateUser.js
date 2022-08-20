import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../../component/layout/MetaData";
import { MdMailOutline, MdOutlineVerifiedUser } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import SideBar from "../Sidebar/SideBar";
import {
    getUserDetails,
    updateUser,
    clearErrors,
} from "../../../redux/actions/userAction";
import Loader from "../../../component/Loader/Loader";
import { UPDATE_USER_RESET } from "../../../redux/actionTypes/userType";
import { useNavigate, useParams } from "react-router-dom";
import "../NewProduct/NewProduct.scss"
import Sidebar from "../Sidebar/SideBar";

const UpdateUser = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { id } = useParams()

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (isUpdated) {
            navigate("/admin/users", { replace: true });
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, isUpdated, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <div className="container1">
                <div className="container2">
                    <MetaData title="KULLANICI GÜNCELLE" />
                    <div className="dashboard">
                        <Sidebar />
                        <div className="newProductContainer">
                            {loading ? (
                                <Loader />
                            ) : (
                                <form
                                    className="createProductForm"
                                    onSubmit={updateUserSubmitHandler}
                                >
                                    <h1>Kullanıcı Güncelle</h1>

                                    <div>
                                        <BsFillPersonLinesFill />
                                        <input
                                            type="text"
                                            placeholder="Ad"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MdMailOutline />
                                        <input
                                            type="email"
                                            placeholder="E-Posta"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <MdOutlineVerifiedUser />
                                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="">Rol Seç</option>
                                            <option value="Admin">Yönetici</option>
                                            <option value="User">Kullanıcı</option>
                                        </select>
                                    </div>

                                    <input
                                        id="createProductBtn"
                                        defaultValue={`Güncelle`}
                                        readOnly
                                        disabled={updateLoading ? true : false || role === "" ? true : false}
                                    />

                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;