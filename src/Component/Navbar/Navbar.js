import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { FaDatabase } from "react-icons/fa6";
import { FiLogOut, FiLogIn } from "react-icons/fi"; // Import FiLogOut icon
import $ from 'jquery';
import logo from '../images/logo.png';
import Home from '../home'; // Import Home component
import Dashboard from '../dashboard'; // Import Dashboard component


const Navbar = () => {
  const navigate = useNavigate(); // Get the navigate function for redirection
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isotp, setIsOtp] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
    const isotp = localStorage.getItem("otp_sent");
    setIsOtp(isotp === "success");
  }, []);

  const handleLogout = async () => {
    // Call your logout API here to invalidate the access token
    // After successful logout, clear the token from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refereshToken');
    // Redirect the user to the login page
  };

  function animation() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {
    
    animation();
    $(window).on('resize', function () {
      setTimeout(function () { animation(); }, 500);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <p>MDB Co.</p>
      <button
        className="navbar-toggler"
        onClick={() => setTimeout(animation)}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/Home" >
              <i><IoHomeOutline /></i>Home
              </NavLink>
          </li>
          {/* <li className="nav-item active">
            <NavLink className="nav-link" to="/Dashboard" >
              <i><IoHomeOutline /></i>Dashboard
            </NavLink>
          </li> */}
          <li className="nav-item active">
            <NavLink className="nav-link" to="/Databases" >
              <i><FaDatabase /></i>Databases
            </NavLink>
          </li>
          <li className="nav-item active dropdown">
            {isLoggedIn ? ( // Display Logout button if user is logged in
              <NavLink className="nav-link" to="/logout" onClick={handleLogout}>
                <i><FiLogOut /></i>Logout
              </NavLink>
            ) : ( // Display Login button if user is not logged in
              <NavLink className="nav-link" to="/login" >
                <i><FiLogIn /></i>Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
