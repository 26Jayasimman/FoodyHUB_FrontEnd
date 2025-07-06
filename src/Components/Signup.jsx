import React, { useState } from "react";
import "../Styles/Signup.css";
import axios from "axios";

function SignUp({ isOpen, onCancel }) {
  const initialError = {
    name: { required: false },
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialError);

  const [load, setLoad] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = initialError;
    let hasError = false;

    if (inputs.name === "") {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email === "") {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      try {
        setLoad(true);

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/apisignup`,
          {
            username: inputs.name,
            email: inputs.email,
            password: inputs.password,
          }
        );

        if (response.data.message) {
          alert(response.data.message);
          setInputs({ name: "", email: "", password: "" });
        }
      } catch (error) {
        console.log(error);
        errors.custom_error = error.response?.data?.message || "Signup failed";
      } finally {
        setLoad(false);
      }
    }
    setErrors(errors);
  };

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="l-mb-1">
        <div className="l-mb-2">
          <button onClick={onCancel}>X</button>
          <div className="reg">
            <h1>Register Now</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="namediv">
              <label htmlFor="ni">Name</label>
              <br />
              <input
                id="ni"
                type="text"
                className="nd"
                name="name"
                onChange={handleChange}
              />
              {errors.name.required === true ? (
                <p className="require">Name is Required.</p>
              ) : null}
            </div>

            <div className="emaildiv">
              <label htmlFor="ei">Email</label>
              <br />
              <input
                id="ei"
                type="text"
                className="ed"
                name="email"
                onChange={handleChange}
              />
              {errors.email.required === true ? (
                <p className="require">Email is Required.</p>
              ) : null}
            </div>

            <div className="password-div">
              <label htmlFor="pi">Password</label>
              <br />
              <input
                id="pi"
                type="password"
                className="pd"
                name="password"
                onChange={handleChange}
              />
              {errors.password.required === true ? (
                <p className="require">Password is Required.</p>
              ) : null}
            </div>

            <div>
              {errors.custom_error ? (
                <p className="cem">{errors.custom_error}</p>
              ) : null}
            </div>

            {load ? (
              <div className="spinner-border text-danger" role="status"></div>
            ) : null}

            <div className="bd">
              <input
                className=" btn btn-danger"
                type="submit"
                disabled={load}
              />
            </div>
          </form>

          <div>
            <h5>Already have account ? Please Login</h5>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
export default SignUp;
