import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext.js";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        userData
      );
      const user = response.data;
      setCurrentUser(user);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false); // Ensure loading state is reset on error
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
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">
            {loading && userData.email && userData.password ? (
              <p>Loading Please Wait...</p>
            ) : (
              "Login"
            )}
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
