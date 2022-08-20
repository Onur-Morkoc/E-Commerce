import React, { useState } from 'react'
import "./UserOptions.scss"
import { RiDashboardLine } from "react-icons/ri";
import { FaRegListAlt } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineExitToApp } from "react-icons/md";
import { v4 as uuid } from 'uuid';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/actions/userAction';

const UserOptions = ({ user }) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const IconHandler = () => setOpen((prev) => !prev)
    
    const options = [
        { icon: <FaRegListAlt />, name: "Siparişler", func: orders },
        { icon: <BsFillPersonLinesFill />, name: "Profil", func: account },
        { icon: <AiOutlineShoppingCart />, name: `Sepet`, func: cart },
        { icon: <MdOutlineExitToApp />, name: "Çıkış", func: logoutUser },
    ];

    if (user.role === "Admin") {
        options.unshift({
            icon: <RiDashboardLine />,
            name: "Panel",
            func: dashboard,
        });
    }

    function dashboard() {
        navigate(`/admin/dashboard`, { replace: true });
        setOpen(false)
    }

    function orders() {
        navigate(`/orders`, { replace: true });
        setOpen(false)
    }

    function account() {
        navigate(`/account`, { replace: true });
        setOpen(false)
    }

    function cart() {
        navigate(`/cart`, { replace: true });
        setOpen(false)
    }

    function logoutUser() {
        dispatch(logout())
        navigate(`/`, { replace: true });

        setOpen(false)
    }


    return (

        <div className="profile-container">
            <div className={open ? "profile-image open" : "profile-image"} onClick={IconHandler}>
                <img src={user.avatar.url ? user.avatar.url : "https://st2.depositphotos.com/1104517/11965/v/950/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"} alt="resim" />
            </div>

            {open && options.map(option => {
                let unique_id = uuid();
                return <Icon key={unique_id.toString()} icon={option.icon} open={open} description={option.name} click={option.func} />
            })}


        </div>
    )
}

export default UserOptions