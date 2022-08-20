import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../../../component/layout/MetaData';
import Loader from '../../../component/Loader/Loader';
import "./UserProfile.scss"

const UserProfile = () => {

    let navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
         navigate(`/login`, { replace: true });
        }
      }, [navigate, isAuthenticated]);

    return (
        loading ? <Loader /> :
            <>
                <MetaData title={`${user.name} Profil`} />
                <div className="profileContainer">
                    <div>
                        <h1>Profilim</h1>
                        <img src={user.avatar.url} alt={user.name} />
                        <Link to="/me/update">Profili Düzenle</Link>
                    </div>
                    <div>
                        <div>
                            <h4>Ad Soyad</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>E-Posta</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Katılma Tarihi</h4>
                            <p>{String(user.createdAt).substr(0, 10)}</p>
                        </div>

                        <div>
                            <Link to="/orders">Siparişlerim</Link>
                            <Link to="/password/update">Şifre değiştir</Link>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default UserProfile