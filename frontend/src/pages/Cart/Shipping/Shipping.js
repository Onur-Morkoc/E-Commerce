import React, { useState } from "react";
import "./Shipping.scss";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../redux/actions/cartAction";
import MetaData from "../../../component/layout/MetaData";
import { MdOutlineHome, MdTransferWithinAStation, MdOutlinePinDrop, MdLocationCity, MdOutlinePhoneInTalk, MdPublic } from "react-icons/md";
import { Country, State } from "country-state-city";
import Error from "../../../component/Error/Error";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";


const Shipping = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const [error, setError] = useState(false);

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNo.length < 10 || phoneNo.length > 10) {
            
            setError("Phone Number should be 10 digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate(`/order/confirm`, { replace: true });

    };

    return (
        <>
            <MetaData title="Gönderim Detayları" />
            {error && <Error error={error} />}
            <CheckoutSteps activeStep={0}/>
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Adres Bilgileri</h2>

                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <MdOutlineHome />
                            <input
                                type="text"
                                placeholder="Adres"
                                required
                                value={address||""}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdLocationCity />
                            <input
                                type="text"
                                placeholder="Şehir"
                                required
                                value={city||""}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdOutlinePinDrop />
                            <input
                                type="number"
                                placeholder="Pin Kodu"
                                required
                                value={pinCode||""}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <MdOutlinePhoneInTalk />
                            <input
                                type="number"
                                placeholder="Telefon Numarası"
                                required
                                value={phoneNo||""}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <MdPublic />
                            <select
                                required
                                value={country||""}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Ülke</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <MdTransferWithinAStation />
                                <select
                                    required
                                    value={state||""}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">Durum</option>
                                    {State && State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                          
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Devam Et"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Shipping;