import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Header.css";

import ModalLogin from "./ModalLogin";

// Modal.setAppElement("#root");

function Header() {
  const location = useLocation(); // React Router v6 hook
  const [backgroundColor, setBackgroundColor] = useState("");
  const [display, setDisplay] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  
  const logonavigate = useNavigate();
  const navigate = useNavigate()
  
  const handlelogo = () => {
    logonavigate(`/`);
  };
  
  const handleLogin = () => {
    setLoginModal(true);
  };
  
  const handleCancel = () => {
    setLoginModal(false);
  };
  
  const handleSignup=()=>{
    navigate('/Signup')

  }

  useEffect(() => {
    const path = location.pathname;
    const bg = path === "/" ? "transparent" : "#000000";
    const disp = path === "/" ? "none" : "inline-block";
    setBackgroundColor(bg);
    setDisplay(disp);
  }, [location]); // run effect on route change

  return (
    <div className="header1" style={{ backgroundColor: backgroundColor }}>
      <div
        className="logo1"
        style={{ display: display }}
        onClick={() => handlelogo()}
      >
        F!
      </div>
      <div className="lsf">
        <button className="logb1" type="button" onClick={handleLogin}>
          Login
        </button>
        <button className="logb1" onClick={handleSignup}>SignUp</button>
      </div>

      <ModalLogin isOpen={loginModal} onCancel={handleCancel} />
    </div>
  );
}

export default Header;
