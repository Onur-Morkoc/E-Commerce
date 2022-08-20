import React, { useState } from "react";
import "./ForgotPassword.scss";
import Loader from "../../../component/Loader/Loader";
import { MdMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../../redux/actions/userAction";

import Error from "../../../component/Error/Error";
import MetaData from "../../../component/layout/MetaData";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const { error, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };


    return (

        loading ? <Loader /> :
            <>
                {error && <Error error={error} clearErrors={clearErrors} />}
                <MetaData title="ŞİFREMİ UNUTTUM" />
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                        <h2 className="forgotPasswordHeading">Şifremi Unuttum</h2>

                        <form
                            className="forgotPasswordForm"
                            onSubmit={forgotPasswordSubmit}
                        >
                            <div className="forgotPasswordEmail">
                                <MdMailOutline />
                                <input
                                    type="email"
                                    placeholder="E-Posta"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Gönder"
                                className="forgotPasswordBtn"
                            />
                        </form>
                    </div>
                </div>
            </>


    );
};

export default ForgotPassword;