import React, { useState, useEffect } from "react";
import "./UpdatePassword.scss";
import Loader from "../../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../../redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../../redux/actionTypes/userType";
import MetaData from "../../../component/layout/MetaData";
import { MdLockOpen, MdLockOutline, MdOutlineVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Error from "../../../component/Error/Error";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {

        if (isUpdated) {

            navigate(`/account`, { replace: true });

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch,navigate, isUpdated]);

    return (

        loading ? <Loader /> :
            <>
                {error && <Error error={error} clearErrors={clearErrors} />}
                <MetaData title="ŞİFREMİ DEĞİŞTİR" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className="updatePasswordHeading">Profili Güncelle</h2>

                        <form
                            className="updatePasswordForm"
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className="loginPassword">
                                <MdOutlineVpnKey />
                                <input
                                    type="password"
                                    placeholder="Eski Şifte"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="loginPassword">
                                <MdLockOpen />
                                <input
                                    type="password"
                                    placeholder="Yeni Şifre"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <MdLockOutline />
                                <input
                                    type="password"
                                    placeholder="Şifreyi Onayla"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Kaydet"
                                className="updatePasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </>


    );
};

export default UpdatePassword;