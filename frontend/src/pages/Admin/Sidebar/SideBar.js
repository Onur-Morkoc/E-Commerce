import SideBarMenu from './SideBarMenu/SideBarMenu';
import "./SideBar.scss"
import {
    MdOutlineDashboard,
    MdPostAdd,
    MdPlaylistAdd,
    MdListAlt,
    MdPeopleOutline,
    MdOutlineRateReview
} from 'react-icons/md';
import { useState } from 'react';


const Sidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            url:"/admin/dashboard"
        },
        {
            name: "All Product",
            icon: <MdPostAdd />,
            url:"/admin/products"
        },
        {
            name: "Create Product",
            icon: <MdPlaylistAdd />,
            url:"/admin/product"
        },
        {
            name: "Orders",
            icon: <MdListAlt />,
            url:"/admin/orders"
        },
        {
            name: "Users",
            icon: <MdPeopleOutline />,
            url:"/admin/users"
        },
        {
            name: "Reviews",
            icon: <MdOutlineRateReview />,
            url:"/admin/reviews"
        },

    ]

    const [isOpen, setIsOpen] = useState(false)


    const toggle = () => setIsOpen(!isOpen)



    return (
        <section className={isOpen ? "active" : ""}>
            <div className={`sidebar ${isOpen ? "active" : ""}`}>
                <div className={`sidebar_content ${isOpen ? "active" : ""}`}>
                    <ul>
                        {menuItems.map((item, index) => <SideBarMenu key={index} name={item.name} url={item.url} icon={item.icon} class_name={isOpen ? "active" : ""} />)}
                    </ul>


                </div>

            </div>

        </section>
    );
}

export default Sidebar;