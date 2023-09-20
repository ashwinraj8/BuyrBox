import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';


const ProductList = () => {

    const [products, setProducts] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        // console.log(val);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) getProducts();
    }

    const searchHandle = async (e) => {
        try {
            // console.log(e.target.value)
            let key = e.target.value;
            if (key) {
                let result = await fetch(`http://localhost:5000/search/${key}`);
                result = await result.json();
                console.log(result);
                if (result) {
                    setProducts(result);
                }
            }
            else {
                getProducts();
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <>
            <div className="product-list">
                <h3>{t("productsList")}</h3>
                <input className="search-product-box"
                    onChange={searchHandle}
                    type='text'
                    placeholder={t("searchProductPlaceholder")}
                />
                <ul>
                    <li>
                        {t("sNo")}
                    </li>
                    <li>
                        {t("name")}
                    </li>
                    <li>
                        {t("price")}
                    </li>
                    <li>
                        {t("category")}
                    </li>
                    <li>{t("operation")}</li>
                </ul>
                {
                    products.length ? products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>$ {item.price}</li>
                            <li>{item.category}</li>
                            <li><button onClick={() => deleteProduct(item._id)}>{t("deleteButton")}</button>
                                <Link to={'/update/' + item._id}>{t("updateButton")}</Link>
                            </li>
                        </ul>
                    ) : <h1>{t("productNotFound")}</h1>
                }
            </div>
        </>
    )
}

export default ProductList;