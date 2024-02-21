import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { FormContainer } from "./common";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VerificationPage from "../verification/verificationpage";

const BoxContainer = styled.div`
  width: 350px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #c6b5a5;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(241, 196, 15);
  background: linear-gradient(to right, #edb9a6, #edb9a6);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #796565;
  z-index: 10;
  padding-left: 20px;
  margin: 0;
`;

const SmallText = styled.h5`
  color: black;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  padding-left: 60px;
  margin-top: 39px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");
  const [isotp, setIsOtp] = useState(false);

  const playExpandingEffect = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchActive = (active) => {
    setTimeout(() => setActive(active), 400);
  };

  const switchToSignin = () => {
    playExpandingEffect();
    switchActive("signin");
  };

  const contextValue = {
    switchToSignin,
    playExpandingEffect,
  };

  useEffect(() => {
    const isotp = localStorage.getItem("otp_sent");
    setIsOtp(isotp === "success");
  }, []);

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            variants={backdropVariants}
            transition={expandingTransition}
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
          />
          {active === "signin" && (
            <>
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>to MDB</HeaderText>
              </HeaderContainer>
              <SmallText>Please sign-in to continue!</SmallText>
            </>
          )}
        </TopContainer>
        <InnerContainer>
          {isotp ? <VerificationPage /> :
          
          <LoginForm />
          // :<SmallText>An Error OCcured</SmallText>
        }
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
