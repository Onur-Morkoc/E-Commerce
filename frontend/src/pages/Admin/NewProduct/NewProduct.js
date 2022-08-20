import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.scss";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../../redux/actions/productAction";
import MetaData from "../../../component/layout/MetaData";
import { MdOutlineAccountTree, MdOutlineDescription, MdOutlineSdStorage, MdSpellcheck, MdOutlineAttachMoney } from "react-icons/md"
import SideBar from "../Sidebar/SideBar";
import { NEW_PRODUCT_RESET } from "../../../redux/actionTypes/productType";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Dizüstü Bilgisayar",
        "Ayakkabı",
        "Pantolon",
        "Gömlek",
        "Kıyafet",
        "Kamera",
        "Akıllı Telefonlar",
    ];

    useEffect(() => {

        if (success) {

            navigate("/admin/dashboard", { replace: true });
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        console.log("lkadsşoslk")

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(reader.result)
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    console.log(imagesPreview)

    return (
        <Fragment>
            <div className="container1">
                <div className="container2">
                <MetaData title="ÜRÜN OLUŞTUR" />
                <div className="dashboard">
                    <SideBar />
                    <div className="newProductContainer">
                        <form
                            className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={createProductSubmitHandler}
                        >
                            <h1>Ürün Oluştur</h1>

                            <div>
                                <MdSpellcheck />
                                <input
                                    type="text"
                                    placeholder="Ürün adı"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MdOutlineAttachMoney />
                                <input
                                    type="number"
                                    placeholder="Fiyat"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <MdOutlineDescription />

                                <textarea
                                    placeholder="Ürün Açıklaması"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>

                            <div>
                                <MdOutlineAccountTree />
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Kategori Seçin</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <MdOutlineSdStorage />
                                <input
                                    type="number"
                                    placeholder="Stok"
                                    required
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>

                            <div id="createProductFormFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={createProductImagesChange}
                                    multiple
                                />
                            </div>

                            <div id="createProductFormImage">
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Ürün Yorumları" />
                                ))}
                            </div>


                            <input
                                id="createProductBtn"
                                defaultValue={`Oluştur`}
                                readOnly
                                disabled={loading ? true : false}
                            />



                        </form>
                    </div>
                </div>
                </div>
                </div>
        </Fragment>
    );
};

export default NewProduct;