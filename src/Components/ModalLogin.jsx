import React, { useState } from "react";
import "../Styles/ModalLogin.css";
import Google from "./Google";
import axios from "axios";

function ModalLogin({ isOpen, onCancel }) {
  
  const [inputs,setInputs]=useState({email:'',password:''})
  const [errors,setErrors]=useState({email:false,password:false,custom:null});
  const [loads,setLoads]=useState(false)
  
  if (!isOpen) return null;

  const handleEmailChange=(event)=>{
    const{name,value}=event.target

    setInputs({...inputs,[name]:value})
    setErrors({...errors,[name]:false,custom:null})
  }

  const handUserLogin=async()=>{
    const {email,password}=inputs;

    let newError={
      email:false,
      password:false,
      custom:null
    }

    if(!email){
      newError.email=true
    }

    if(!password){
      newError.password=true
    }

    if(!email || !password){
      setErrors(newError)
      return
    };

    try {
      setLoads(true)

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/apilogin`,{
          email,
          password
        }
      )
      alert(response.data.message)
      setInputs({email:'',password:''})
      onCancel()
      
    } catch (error) {
      console.log(error);  
      setErrors({
        ...errors,custom:error.response?.data?.message || 'Login Failed',
      }
      )}
    finally{
      setLoads(false)
    }


  }



  return (
    <>
      <form className="f1">
        <div className="f2">
          <h1 className="f3">Login</h1>

          <div>
            <label className="f4" htmlFor="email">
              Email
            </label>
            <input
              className="f5"
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={inputs.email}
              onChange={handleEmailChange}
            />

           {errors.email && <p className="email-err-check">Invalid Email.</p>}
          </div>

          <div>
            <label className="f4" htmlFor="passname">
              Password
            </label>
            <input
              className="f5"
              type="password"
              id="passname"
              name="password"
              value={inputs.password}
              placeholder="Enter Password"
              onChange={handleEmailChange}
            />
             {errors.password && <p className="password-err-check">Invalid Password.</p>}
          </div>

           {errors.custom && <p className="custom-error">{errors.custom}</p>}

          {loads && <div className="spinner-border text-primary" role="status"></div>}

          <div className="f6">
            <button id="logbutton" type="button" onClick={handUserLogin}>
              Login
            </button>
            <button id="Cancelbutton" type="button" onClick={onCancel}>
              Cancel
            </button>
            <div className="googlebutton">
              {" "}
              <Google />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ModalLogin;
