import React, { useState } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const url = "https://free-todo-api.vercel.app/user/log-in"

    const handleLogin = async (e) =>{
        e.preventDefault()

        try{
            const response = await axios.post(url, {email, password})
            console.log(response);
            localStorage.setItem("authToken", JSON.stringify(response.data.token))
            if(response.status === 200){
                alert("Login succesfull")
            }
            navigate("/")

        }catch(err){
            console.log(err)
            alert(err?.response?.data?.error)

        }
    }
    return (
        <>
        <div className='mainSection'>
                <div className='leftBod'>
            
                </div>
        <div className='rightBody'>
            <h2>Login</h2>
            <form>
                <div className='wrapper'>
                <div className='email'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='email'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default Login;