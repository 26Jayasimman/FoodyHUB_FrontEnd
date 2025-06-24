import { GoogleLogin,googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "../Styles/Google.css";

function Google() {

  const handleLogout=()=>{
    googleLogout()
  }
  
  return (
    <>
    <div className="googlelog">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
           const credentialtoken=jwtDecode(credentialResponse.credential)
          console.log(credentialtoken);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
      <div className="logoutdiv">
        <button className="logoutbutton" onClick={handleLogout}>Logout</button>
      </div>
    </>    
    );
  }


export default Google;
