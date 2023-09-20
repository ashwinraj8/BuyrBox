import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const naviagte = useNavigate();
    const logout = () => {
        localStorage.clear();
        naviagte('/signup');
    }
    return (
        <div>
            <img 
            alt='logo'
            className='logo' 
            src='https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258__340.png' />
            {auth ? <ul className='nav-ul '>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add</Link></li>
                <li><Link to="/update">Update</Link></li>
                {/* <li></li> */}
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup ">Logout ({JSON.parse(auth).name})</Link></li>
                {/* <li><Link to="/login">Login</Link></li> */}
                {/* <li>{auth ? <Link onClick={logout} to="/signup ">Logout</Link> :  <Link to="/signup">SignUp</Link>}</li> */}
            </ul>

                :
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;