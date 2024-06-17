import React, { useContext, useEffect } from "react";
import Posts from "../components/Posts";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Posts />
    </div>
  );
};

export default Home;
