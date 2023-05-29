import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Navbar = ({ title = "Contactify" }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand mx-3">{title}</div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto mx-3">
            {user ? (
              <>
                <li className="nav-item mx-2 px-3">
                  <Link to="/create">
                    <div className="nav-link active">Create</div>
                  </Link>
                </li>
                <li
                  className="nav-item mx-3 px-2"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                    toast.success("Logged out.");
                    navigate("/login", { replace: true });
                  }}
                >
                  <button className="btn btn-danger px-5">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">
                    <div className="nav-link">Login</div>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/register">
                    <div className="nav-link">Register</div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
