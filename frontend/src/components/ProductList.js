import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import axios from 'axios';

// axios.interceptors.response.use(
//     (response) => {
//       console.log('Axios interceptor response data--->>',response);
//         Object.assign(response,{testApi:'1212'})
//       return response;
//     },
//     (error) => {
//       console.error('An error occurred:', error);
//       // Handle the error as needed
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.request.use(
//     (request) => {
//       console.log('Axios interceptor request data--->>',request);
//         // Object.assign(response.config,{testApi:'1212'})
//       return request;
//     },
//     (error) => {
//       console.error('An error occurred:', error);
//       // Handle the error as needed
//       return Promise.reject(error);
//     }
//   );

const ProductList = () => {

    const [products, setProducts] = useState([]),
    [isLoading, setIsLoading] = useState(true),
    { t } = useTranslation();

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/products');
            console.log(response.data);
            for(let id of response.data) console.log(id.userId);
            setProducts(response.data);
        } catch (error) {
            console.error('An error occurred:', error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
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
                    <li>{t("Details")}</li>
                </ul>
                {isLoading ? (
                    <div>Loading...</div>
                ):(
                        products.length ? products.map((item, index) =>
                            <ul key={item._id}>
                                <li>{index + 1}</li>
                                <li>{item.name}</li>
                                <li>$ {item.price}</li>
                                <li>{item.category}</li>
                                <li>
                                    {/* <Link to={'/update/' + item._id}>{t("Profile & Item")}</Link> */}
                                    <Link to={`/profileanditem/${item.userId}/${item._id}/${item.name}`}>{t("Profile & Item")}</Link>
                                </li>
                            </ul>
                        ) : <h1>{t("productNotFound")}</h1>
                )}
                
            </div>
        </>
    )
}

export default ProductList;