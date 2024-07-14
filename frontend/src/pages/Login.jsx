import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import {UserContext} from '../context/UserContext'

function Login() {
  const [email, setemail] = useState("")
  const [password,setpassword] = useState("")
  const [error,seterror] = useState(false) //setting error message to false initially
  const {setUser}=useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async()=>{
    try{
      const res = await fetch("/api/auth/login",{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        credentials:'include',
        body: JSON.stringify({email:email,password:password})
      })

      if(res.ok){
        const data=await res.json();
        const cookies = res.headers.get('Set-Cookie');
        console.warn('Data',data)
        console.warn('Cookies',cookies);

        setUser(data)
      }
      else{
        console.error('Request failed with status',res.status);
      }

      navigate("/") //to home page
    }
    catch(err){
      seterror(true)
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blogosphere</Link>
        </h1>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center space-y-4 w-[80%] md:w-[25%] ">
          <h1 className="text-xl font-bold text-left">
            Login to your account
          </h1>
          <input onChange={(e)=>setemail(e.target.value)} className='w-full px-4 py-2 border-black outline-0 ' type='email' placeholder='Enter your email'>
          </input>
          <input onChange={(e)=>setpassword(e.target.value)} className='w-full px-4 py-2 border-black outline-0 ' type='password' placeholder='Enter your password'>
          </input>

          <button onClick={handleLogin} className='w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black'>
            Login
          </button>
          {
            error && <h3 className="text-red-500 text-sm">Something went wrong</h3>
          }
          <div className='flex justify-center space-x-3 '>
            <p>
              New Here?
            </p>
            <p className='text-gray-500 hover:text-black '>
              <Link to='/register'>Create an account</Link>
            </p>
          </div>

        </div>
      </div>
      <Footer/>
    </div>    
  )
}

export default Login