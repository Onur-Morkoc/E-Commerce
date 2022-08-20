import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, updateProduct, clearErrors } from "../../../redux/actions/productAction";
import "../NewProduct/NewProduct.scss"
import { MdOutlineAccountTree, MdOutlineDescription, MdOutlineSdStorage, MdSpellcheck, MdOutlineAttachMoney } from "react-icons/md"
import SideBar from "../Sidebar/SideBar";
import { UPDATE_PRODUCT_RESET } from "../../../redux/actionTypes/productType";
import MetaData from "../../../component/layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { id } = useParams()

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
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

    const productId = id

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }

        if (isUpdated) {
            navigate("/admin/products", { replace: true });
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, isUpdated, navigate, productId, product]);

    const updateProductSubmitHandler = (e) => {
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
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <div className="container1">
                <div className="container2">
                    <MetaData title="ÜRÜNÜ GÜNCELLE" />
                    <div className="dashboard">
                        <SideBar />
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateProductSubmitHandler}
                            >
                                <h1>Ürün Düzenle</h1>

                                <div>
                                    <MdSpellcheck />
                                    <input
                                        type="text"
                                        placeholder="Ürün Adı"
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
                                        value={price}
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
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Kategori Seç </option>
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
                                        value={Stock}
                                    />
                                </div>

                                <div id="createProductFormFile">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProductImagesChange}
                                        multiple
                                    />
                                </div>

                                <div id="createProductFormImage">
                                    {oldImages &&
                                        oldImages.map((image, index) => (
                                            <img key={index} src={image.url} alt="Eski Ürün Yorumları" />
                                        ))}
                                </div>

                                <div id="createProductFormImage">
                                    {imagesPreview.map((image, index) => (
                                        <img key={index} src={image} alt="Ürün Yorumları" />
                                    ))}
                                </div>


                                <input
                                    id="createProductBtn"
                                    defaultValue={`Düzenle`}
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

export default UpdateProduct;