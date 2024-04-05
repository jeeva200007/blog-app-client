import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/blog-logo.png";
import { HiBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavshow, setNavShow] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setNavShow(false);
    } else {
      setNavShow(true);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={Logo} alt="logo" /> <p>MY-BLOG</p>
        </Link>
        {currentUser?.id && isNavshow && (
          <ul className="nav_menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        {!currentUser?.id && isNavshow && (
          <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav_toggle-btn"
          onClick={() => setNavShow(!isNavshow)}
        >
          {isNavshow ? <AiOutlineClose /> : <HiBars3 />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
