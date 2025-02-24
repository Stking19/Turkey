import React, { useState } from 'react';
import './signup.css'
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = "http://localhost:5173/"


    const url = "https://free-todo-api.vercel.app/user/sign-up"

    const handleSignUp = async (e) =>{
        e.preventDefault()

        try{
            const response = await axios.post(url, {email, password, baseUrl})
            console.log(response);
            alert(response.data.message)

        }catch(err){
            console.log(err)
            alert(err.response.data.error)

        }
    }
    return (
        <>
        <div className='mainSection'>
                <div className='leftBod'>
            
                </div>
        <div className='rightBody'>
            <h2>Register</h2>
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
                <button type="submit" onClick={handleSignUp}>Register</button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default Signup;