import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom';

const UpdateProduct = ()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        // console.log(params);
        getProductDetails();
    },[])

    const getProductDetails = async()=>{
        // console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    
    }

    const updateProduct = async ()=>
    {
        let result = fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = (await result).json();
        console.log(result);
        navigate('/');

    }
    // const [name, setName] = useState('');
    return(
        <div className='product'>
            <h1>Update Product</h1>
            <input className='inputBox' type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="Enter product name"/>
          {error && !name &&  <span className='invalid-input'>Enter valid name</span> }
            <input className='inputBox'  type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder="Enter product price"/>
            {error && !price &&  <span className='invalid-input'>Enter valid price</span> }
            <input className='inputBox' type="text" onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder="Enter product cat"/>
            {error && !category &&  <span className='invalid-input'>Enter valid category</span> }
            <input className='inputBox' type="text" onChange={(e)=>{setCompany(e.target.value)}} value={company} placeholder="Enter product company"/>
            {error && !company &&  <span className='invalid-input'>Enter valid company</span> }
            <button onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;