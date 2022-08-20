import React, { useState, useEffect } from "react";
import "./ResetPassword.scss";
import Loader from "../../../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../redux/actions/userAction";
import MetaData from "../../../component/layout/MetaData";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../component/Error/Error";

const ResetPassword = () => {

    const dispatch = useDispatch();

    const { token } = useParams()

    let navigate = useNavigate();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {
        if (success) {

            navigate(`/login`, { replace: true });
        }
    }, [dispatch, success,navigate]);

    return (

        loading ? <Loader /> :
            <>
                {error && <Error error={error} clearErrors={clearErrors} />}
                <MetaData title="ŞİFREMİ DEĞİŞTİR" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h2 className="resetPasswordHeading">Profili Güncelle</h2>

                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                        >
                            <div>
                                <MdLockOpen />
                                <input
                                    type="password"
                                    placeholder="Yeni Şifre"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                className="resetPasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </>

    );
};

export default ResetPassword;