import { NavLink } from "react-router-dom";
import "./SideBarMenu.scss"

const SideBarMenu = ({ name, icon, class_name,url }) => {


    return (
        <li>
            <NavLink to={url} className={`link ${class_name}`} >
                <div className="link_icon">{icon}</div>
                <div className={`link_text ${class_name}`}>{name}</div>
            </NavLink>
        </li>

    )

}

export default SideBarMenu;