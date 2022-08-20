import React from 'react'

function Icon({ icon, open, description, click }) {
    return (
        <div className='icon' onClick={open ? click : () => { }}>
            <div className={open ? "profile-icon open" : "profile-icon"} >
                {icon}
            </div>
            <div className={open ? "icon-description open" : "icon-description"}>{description}</div>
        </div>
    )
}

export default Icon