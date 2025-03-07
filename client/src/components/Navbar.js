import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

export default function Navbar() {

  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            <img
              src="https://media-hosting.imagekit.io//2fcb3d815f4841f7/DALL%C2%B7E%202025-02-17%2018-remove-bg-io.png?Expires=1834424603&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=WR1StE9bxRyrQkgs5xqGVAWd-52YqB~v9XaUtCYuWX7Th~rtIpI2HoTLQHP54npopfl3M8udMUgJGNnzPQnFo0z0jmy~b3wxYw653RNgkPQ7zSu-EmV3JQGSRFa--SZtowGEohAXm88YqC1a~4wS7ne4ap8BAZB8q1coPHCKvAhrkb3hdlfu679Sq3a-tAfc~LUqwFQw40u0CyHgNh~Gkz-fX5YRNJfqpXSoCO1UkJfcN2UPE-guitjB7K2FhuYP6ARhEIG5Va5H9vGZc3xgrIQxgsVybDxu-7vDBTyOdDGLfvf5b1IczpbjXOVjlGwvym9jxjZtgmzm~DWFY6i4WQ__"
              alt="ArtVenture"
              style={{ height: "90px", width: "80px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {/* <li className="nav-item">
                <Link
                  className="nav-link active fs-5 text-dark"
                  aria-current="page"
                  to="#"
                >
                  Home
                </Link>
              </li> */}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 text-dark"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-dark text-white mx-1" to="/login">
                  Login
                </Link>

                <Link className="btn bg-dark text-white mx-1" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-dark text-white mx-2" onClick={()=>{setCartView(true)}}>
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                  </div>
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div
                  className="btn bg-danger text-white mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
