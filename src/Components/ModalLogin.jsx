import React from "react";
import "../Styles/ModalLogin.css";
import Google from "./Google";

function ModalLogin({ isOpen, onCancel }) {
  if (!isOpen) return null;

  return (
    <>
      <form className="f1">
        <div className="f2">
          <h1 className="f3">Login</h1>

          <div>
            <label className="f4" htmlFor="logname">
              Name
            </label>
            <input
              className="f5"
              type="text"
              id="logname"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="f4" htmlFor="passname">
              Password
            </label>
            <input
              className="f5"
              type="password"
              id="passname"
              placeholder="Enter Password"
            />
          </div>

          <div className="f6">
            <button id="logbutton" type="button">
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
