import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ()=>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const naviagte = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) naviagte('/');
    },[])
    const handleLogin = async ()=>{
        // console.log(email,password); 
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
            },
        })

        result = await result.json();
        console.log(result);
        if (result.name) {
            localStorage.setItem('user',JSON.stringify(result));
            naviagte('/');
            window.location.reload();
        } else {
            alert('please enter corect details!')
        }
    }
    return (
        <div>
            <h1>Login</h1>
                <input className="inputBox" type="text"
                 onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Enter Email"/>
                <input className="inputBox" type="password" 
                 onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Enter Password"/>
                <button onClick={handleLogin}  type="submit" >Login In</button>
        </div>
    )
}

export default Login;