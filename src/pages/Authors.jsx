import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/users`);
        setAuthors(res.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);

  if (isLoading) {
    <Loader />;
  }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container authors_container">
          {authors.map(({ _id: id, avatar, name, posts }) => {
            return (
              <Link key={id} to={`/posts/users/${id}`} className="author">
                <div className="author_avatar">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    alt={`Image of ${name}`}
                  />
                </div>
                <div className="author_info">
                  <h2>{name}</h2>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No users/Authors found.</h2>
      )}
    </section>
  );
};

export default Authors;
