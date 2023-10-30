import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import auth from '../auth/authentication';

export const ProfileAndItem = () => {
  const { userId, itemId,itemName } = useParams();
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showInterest = async ()=>{
    console.log(JSON.parse(auth));
    console.log('For interset -->', userId);
    console.log('Item name===>',itemName);
    try {
      const interestedUserName = JSON.parse(auth).name;
      const interestedUserId = JSON.parse(auth)._id;
      console.log('interestedUserId',interestedUserId);
      const response = await axios.post(`http://localhost:5000/users/${userId}/interested`, {
        name: interestedUserName,
        id: interestedUserId,
        itemId,
        itemName,
      });
      console.log('Interest shared with the Owner', response.data);
      alert('Interest shared with the Owner!')
    } catch (error) {
      console.error('Error in sharing your interest, please try again', error);
      alert('Error in sharing your interest, please try again!')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [itemResponse, userResponse] = await Promise.all([
          axios.get(`http://localhost:5000/product/${itemId}`),
          axios.get(`http://localhost:5000/users/${userId}`),
        ]);

        if (itemResponse.status !== 200 || userResponse.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        const itemData = itemResponse.data;
        const userData = userResponse.data;

        setItem(itemData);
        console.log('itemResponse---->',itemResponse);
        setUser(userData);
        console.log('userData-------->>',userData);
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
        {item && (
          <div>
            <div>Name: {item.name}</div>
            <div>Price: {item.price}</div>
            <button onClick={showInterest}>Show Interest</button>
          </div>
        )}
      </div>
    </>
  );
};
