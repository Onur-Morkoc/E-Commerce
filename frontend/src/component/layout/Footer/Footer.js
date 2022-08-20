import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.scss"
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>Uygulamamızı İndirin</h4>
                <p>Android ve IOS Cep Telefonu İçin Uygulamayı İndirin</p>
                <img src="https://static-cse.canva.com/_next/static/assets/google-play-badge.564x168.5b681e93739c7071a735f767e848cd79.png" alt="Playstore" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/640px-Download_on_the_App_Store_Badge.svg.png" alt="Appstore" />
            </div>
            <div className="midFooter">
                <h1>
                    <Link to="https://www.youtube.com">E-Ticaret</Link>
                </h1>
                <p>Yüksek Kalite Birinci Önceliğimizdir</p>
                <p>Telif Hakları 2022 &copy; Onur</p>
            </div>
            <div className="righFooter">
                <h4>Follow Us</h4>
                <Link to="https://www.youtube.com">YouTube</Link>
                <Link to="https://www.facebook.com">Facebook</Link>
                <Link to="https://www.instagram.com">Instagram</Link>
            </div>
        </footer>
    )
}

export default Footer