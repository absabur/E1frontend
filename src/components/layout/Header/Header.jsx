import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { GiCrossedBones } from "react-icons/gi";
import { Link } from "react-router-dom";
import Search from "../product/Search";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import GlobalState from "../../../GlobalState";
import logo from "../../../images/logo.png";
import { animateScroll } from 'react-scroll';


const Header = () => {
  const [home, sethome] = useState({ width: "0" });
  const [prod, setprod] = useState({ width: "0" });
  const [con, setcon] = useState({ width: "0" });
  const [about, setabout] = useState({ width: "0" });
  const [log, setlog] = useState({ width: "0" });
  const [reg, setreg] = useState({ width: "0" });
  const [profile, setprofile] = useState({ width: "0" });
  const [cart, setcart] = useState({ width: "0" });

  const {toggle, setToggle} = useContext(GlobalState)
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      sethome({ width: "100%" });
    } else {
      sethome({ width: "0" });
    }

    if (location.pathname === "/products") {
      setprod({ width: "100%" });
    } else {
      setprod({ width: "0" });
    }

    if (location.pathname === "/contact") {
      setcon({ width: "100%" });
    } else {
      setcon({ width: "0" });
    }

    if (location.pathname === "/about") {
      setabout({ width: "100%" });
    } else {
      setabout({ width: "0" });
    }

    if (location.pathname === "/login") {
      setlog({ width: "100%" });
    } else {
      setlog({ width: "0" });
    }

    if (location.pathname.slice(0, 10) === "/register/" || location.pathname === "/signup") {
      setreg({ width: "100%" });
    } else {
      setreg({ width: "0" });
    }

    if (location.pathname === "/cart") {
      setcart({ width: "100%" });
    } else {
      setcart({ width: "0" });
    }

    if (location.pathname === "/profile") {
      setprofile({ width: "100%" });
    } else {
      setprofile({ width: "0" });
    }

    animateScroll.scrollToTop({
      duration: 0
    });
  }, [location.pathname]);
  // @ts-ignore
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <div className="header-relative">
        <div className="header">
          <div className="logo-section">
            {/* <img src={logo} alt="logo" /> */}
            <Link style={{textDecoration: "none"}} to="/">
              <img style={{height: "60px", width: "60px", borderRadius: "20px", border: "1px solid var(--v1)"}} src={logo} alt="ABS" />
            </Link>
          </div>
          <div className="nav-links">
            <div className="navbar-flex">
              <div className="homeNav">
                <Link to="/">Home</Link>
                <div style={home} className="homeLine ULine"></div>
              </div>
              <div className="prodNav">
                <Link to="/products">Products</Link>
                <div style={prod} className="prodLine ULine"></div>
              </div>
              <div className="contNav">
                <Link to="/contact">Contact</Link>
                <div style={con} className="contLine ULine"></div>
              </div>
              <div className="aboutNav">
                <Link to="/about">About</Link>
                <div style={about} className="aboutLine ULine"></div>
              </div>
              {/* {isAuthenticated &&
                <div className='logNav'>
                  <Link to="/logout">Log Out</Link>
                  <div style={logout} className='logLine ULine'></div>
                </div>
              } */}
            </div>
          </div>
          <div className="icons">
            {isAuthenticated ? (
              <div className="navbar-flex">
                <div className="cartNav">
                  <Link className="cartArea" to="/cart">
                    <p className="cartCount">{user && user.cart && user.cart.length}</p>
                    {
                      user && user.cart.length  ? 
                      <MdShoppingCart className="react-icons cart" /> :
                      <MdOutlineShoppingCart className="react-icons cart" />                      
                    }
                  </Link>
                  <div style={cart} className="cartLine ULine"></div>
                </div>
                <div style={{ margin: "0 0.5rem" }}></div>
                <div className="profileNav">
                  <Link to="/profile">
                    {user ? (
                      <img
                        className="profileLogo"
                        src={user.avatar.url}
                        alt="user"
                      />
                    ) : (
                      <CgProfile className="react-icons" />
                    )}
                  </Link>
                  <div style={profile} className="profileLine ULine"></div>
                </div>
              </div>
            ) : (
              <div className="navbar-flex">
                <div className="loginNav">
                  <Link to="/login">Log In</Link>
                  <div style={log} className="loginLine ULine"></div>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--white)",
                    height: "30px",
                    width: "3px",
                    margin: "0 1rem",
                  }}
                ></div>
                <div className="regNav">
                  <Link to="/signup">{location.pathname.slice(0, 10) === "/register/" ? "Register" : "Sign Up"}</Link>
                  <div style={reg} className="regLine ULine"></div>
                </div>
              </div>
            )}

            
          </div>
          <div onClick={() => setToggle(!toggle)} className="bar-cross-icon">
            {toggle ? (
              <GiCrossedBones className="react-icons barCrossIcon" />
            ) : (
              <FaBars className="react-icons barCrossIcon" />
            )}
          </div>
        </div>
        {location.pathname === "/products" ? <Search /> : null}

        {toggle ? <div className="hide-border"></div> : null}
        <div className="add-border"></div>

        <div className={`toggle-nav ${toggle ? "visible-nav" : null}`}>
          <div className="navbar-flex">
            <div className="homeNav">
              <Link onClick={() => setToggle(false)} to="/">
                Home
              </Link>
              <div style={home} className="homeLine ULine"></div>
            </div>
            <div className="prodNav">
              <Link onClick={() => setToggle(false)} to="/products">
                Products
              </Link>
              <div style={prod} className="prodLine ULine"></div>
            </div>
            <div className="contNav">
              <Link onClick={() => setToggle(false)} to="/contact">
                Contact
              </Link>
              <div style={con} className="contLine ULine"></div>
            </div>
            <div className="aboutNav">
              <Link onClick={() => setToggle(false)} to="/about">
                About
              </Link>
              <div style={about} className="aboutLine ULine"></div>
            </div>
            {/* {isAuthenticated &&
                <div className='logNav'>
                  <Link onClick={()=>setToggle(false)} to="/logout">Log Out</Link>
                  <div style={logout} className='logLine ULine'></div>
                </div>
              } */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
