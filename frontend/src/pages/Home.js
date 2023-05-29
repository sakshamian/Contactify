import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AllContact from "./AllContact";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);

  return (
    <>
      <div className="jumbotron">
        <div style={{ fontSize: "2rem", fontWeight: '400'}}>Hey {user ? user.name : null}</div>
        <hr className="my-4" />

        <AllContact/>
      </div>
    </>
  );
};

export default Home;
