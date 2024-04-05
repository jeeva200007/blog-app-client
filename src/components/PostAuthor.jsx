import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import author from "../images/author.png";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorId, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorId}`
        );
        setAuthor(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={`posts/users/${authorId}`} className="post_author">
      <div className="post_author-avatar">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          alt=""
        />
      </div>
      <div className="post_author-details">
        <h5>{author?.name}</h5>
        <small>
          {createdAt && typeof createdAt === "string" ? (
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          ) : (
            "Invalid date"
          )}
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
