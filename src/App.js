import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/home";
import styled from "styled-components";
import { AccountBox } from "./Component/accountBox";
import Databases from "./Component/dashboard";
import VerificationPage from "./Component/verification/verificationpage";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isotp, setIsOtp] = useState(false);

  useEffect(() => {
    const isotp = localStorage.getItem("otp_sent");
    setIsOtp(isotp === "success");
    // Retrieve isVerified from localStorage and update state accordingly
    const storedIsVerified = localStorage.getItem("isVerified") === "true";
    setIsVerified(storedIsVerified);
  }, []);

  if (!isVerified) {
    return (
      <Router>
        <main>
          <Routes>
            <Route
              path="/login"
              element={
                <AppContainer>
                  <AccountBox />
                </AppContainer>
              }
            />
          </Routes>
        </main>
      </Router>
    );
  } else {
    return (
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Databases" element={<Databases />} />
          </Routes>
        </main>
      </Router>
    );
  }
};

export default App;
