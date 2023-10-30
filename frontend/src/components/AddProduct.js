import React, { useState } from 'react';


const AddProduct = () => {
    const [name, setName] = useState(''),
        [price, setPrice] = useState(''),
        [category, setCategory] = useState(''),
        [company, setCompany] = useState(''),
        [error, setError] = useState(false);

    const addProduct = async () => {
        console.log(name, price, category, company);

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId._id)
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);

    }
    // const [name, setName] = useState('');
    return (
        <div className='product'>
            <h1>Add Product</h1>
            <input className='inputBox' type="text" onChange={(e) => { setName(e.target.value) }} value={name} placeholder="Enter product name" />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input className='inputBox' type="text" onChange={(e) => { setPrice(e.target.value) }} value={price} placeholder="Enter product price" />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input className='inputBox' type="text" onChange={(e) => { setCategory(e.target.value) }} value={category} placeholder="Enter product cat" />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input className='inputBox' type="text" onChange={(e) => { setCompany(e.target.value) }} value={company} placeholder="Enter product company" />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;