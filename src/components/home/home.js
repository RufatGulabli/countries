import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../images/worldimage.jpg";

const Home = () => {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
    height: "40rem",
    width: "100%"
  };

  return (
    <div className="col-12 d-flex justify-content-center" style={style}>
      <div
        className="col-6 d-flex justify-content-center align-items-center"
        style={{ height: "100px" }}
      >
        <NavLink className="btn btn-primary mr-5" to="/login">
          Login
        </NavLink>
        <NavLink className="btn btn-info" to="/register">
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
