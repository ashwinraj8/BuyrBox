import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ProfileAndListings = () => {
    const { userId, itemId } = useParams();
    const [items, setItems] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [itemResponse, userResponse] = await Promise.all([
                    axios.get(`http://localhost:5000/products/${userId}`),
                    axios.get(`http://localhost:5000/users/${userId}`),
                ]);

                if (itemResponse.status !== 200 || userResponse.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                const itemData = itemResponse.data;
                const userData = userResponse.data;

                setItems(itemData);
                console.log('itemResponse---->', itemData);
                setUser(userData);
                console.log('userData-------->>', userData);
                setError(null);
            } catch (error) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, itemId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div>
                <div>User Description</div>
                {user && (
                    <div>
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>
                    </div>
                )}
                <br></br>
                <div>Item Description</div>
                {items.length ? (
                    <ul>
                        {items.map((item, key) => (
                            <li key={key}>
                                <div>Name: {item.name}</div>
                                <div>Price: {item.price}</div>
                                <Link to={'/update/' + item._id}>Edit</Link>
                            </li>
                        ))}
                    </ul>
                ):<div>{items.result}</div>}
            </div>
        </>
    );
};
