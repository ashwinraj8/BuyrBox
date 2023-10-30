import React, { useEffect,useState } from 'react'
import auth from '../auth/authentication'
import axios from 'axios';

export const NotificationList = () => {
  const [interestedUserDetails, setInteresetedUserDetials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // console.log(JSON.parse(auth).interestedUsers);
    const userId = JSON.parse(auth)._id;
    console.log(interestedUserDetails);
    useEffect(() => {
      // Fetch interested users when the component mounts
      axios.get(`http://localhost:5000/users/${userId}/interestedUsers`)
        .then((response) => {
          setInteresetedUserDetials(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, [userId]);
  return (
    <>
      {interestedUserDetails.map((user)=>
        <div key={user._id}>
          {user.name && user.itemName ?(
            <div>
              {user.name} is interested in {user.itemName}<br></br>
              <button>See profile</button>
            </div>
            
          ):(
            'Information not available'
          )}
        
        </div>
        )};
    </>
      
  )
}
