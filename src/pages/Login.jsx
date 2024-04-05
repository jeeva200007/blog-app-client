import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext.js";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      const user = await response.data;
      setCurrentUser(user);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <form className="form login_form" onSubmit={loginUser}>
          {error && <p className="form_error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="Password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            autoFocus
          />
          <button type="submit" className="btn primary">
            Login
          </button>
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </form>
        <div className="sample-user">
          <p>Email: sampleuser@gmail.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
