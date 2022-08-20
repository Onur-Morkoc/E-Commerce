import React, {  useState, useEffect } from "react";
import "./UpdateProfile.scss";
import { MdMailOutline } from "react-icons/md";
import { MdTagFaces } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../redux/actionTypes/userType";
import Loader from "../../../component/Loader/Loader";
import MetaData from "../../../component/layout/MetaData";
import { useNavigate } from "react-router-dom";
import Error from "../../../component/Error/Error";

const UpdateProfile = () => {

    let navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (isUpdated) {
            dispatch(loadUser());

            navigate(`/account`, { replace: true });

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, navigate, user, isUpdated]);
    return (

        loading ? <Loader /> :
            <>
            {error && <Error error={error} clearErrors={clearErrors}/>}
                <MetaData title="Profili Güncelle" />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateProfileHeading">Profili Güncelle</h2>

                        <form
                            className="updateProfileForm"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="updateProfileName">
                                <MdTagFaces />
                                <input
                                    type="text"
                                    placeholder="Ad"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfileEmail">
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

                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Resmi" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Kaydet"
                                className="updateProfileBtn"
                            />
                        </form>
                    </div>
                </div>
            </>

    );
};

export default UpdateProfile;