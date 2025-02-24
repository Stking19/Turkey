import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { GoVerified } from "react-icons/go";
import { BounceLoader } from 'react-spinners';

const Verify = () => {
  const location = useLocation()
  const locationValue = new URLSearchParams(location.search)
  const token = locationValue.get("token")
  console.log(token)  

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(true);
  const url = `https://free-todo-api.vercel.app/user/verify-email?token=${token}`

  useEffect(() => {
    const handleVerify = async () => {
      setLoading(true)
      setVerify(true)
      try {
        const res = await axios.get(url)
        console.log(res.data)
        alert(res.data.message)
        setLoading(false)
        setVerify(false)
        setTimeout(() =>{
          navigate("/login")
        }, 2000)
        
        
      } catch (err) {
        console.error(err)
        alert(err.response.data.error)
      }
    }

    if (token) {
      handleVerify()
    }
  }, [token])

  return (
    <div className='body' style={{width: "100%", height: "100vh", background: "aliceblue", gap: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      {
        verify ? <BounceLoader color="#9ceb1c" /> : <GoVerified style={{fontSize: "70px", color: "green"}} />
      }

      {
        loading ? <h1>Verifying Email...</h1> : "Verified Successfully"  
      }
      
    </div>
  )
}

export default Verify
