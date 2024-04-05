import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="center">
        <Link to="/" className="btn primary">
          Go back Home
        </Link>
        <p>Page not found</p>
      </div>
    </section>
  );
};

export default ErrorPage;
