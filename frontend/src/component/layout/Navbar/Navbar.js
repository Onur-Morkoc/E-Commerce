import React from 'react'
import style from "./Navbar.module.scss"
import { Link, NavLink } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { v4 as uuid } from 'uuid';
const Navbar = () => {

    const ItemsArray = [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
        { name: "Contact", url: "/contact" },
        { name: "About", url: "/about" },
    ]

    const featureArray = [
        { name: <AiOutlineSearch />, url: "/search" },
        { name: <FiShoppingBag />, url: "/products" },
        { name: <CgProfile />, url: "/login" }
    ]

    const menuItems = ItemsArray.map(Item => {

        let unique_id = uuid();
        return (
            <li key={unique_id.toString()} className={style.menuItem}>
                <NavLink style={isActive => ({ color: isActive.isActive && "#a62d24" })} activeclassname="selected" to={Item.url}>{Item.name}</NavLink>
            </li>
        )
    })

    const featureItems = featureArray.map(Item => {
        let unique_id = uuid();
        return (
            <li key={unique_id.toString()} className={style.featureItem}>
                <NavLink to={Item.url}>{Item.name}</NavLink>
            </li>
        )
    })


    return (
        <div className={style.navbar}>
            <div className={style.logo}>
                <AiOutlineMenu className={style.hamburgerMenu} />
                <Link to={"/"}>E-Ticaret</Link>
            </div>
            <div className={style.menu}>
                <ul className={style.menuItems}>
                    {menuItems}
                </ul>
            </div>
            <div className={style.feature}>
                <ul className={style.featureItems}>
                    {featureItems}
                </ul>
            </div>
        </div>
    )
}

export default Navbar