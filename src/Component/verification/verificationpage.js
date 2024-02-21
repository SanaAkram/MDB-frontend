import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Home from "../home";
import { useNavigate } from "react-router-dom";
import { error } from "jquery";
import { FormError } from "../accountBox/common";
const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-top: -72px;
  margin-bottom: 55px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.input`
  width: 40px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  margin: 0 5px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

const VerifyButton = styled.button`
  background-color: #c6b5a5;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
const VerificationPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [verificationMessage, setVerificationMessage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false); // State to trigger re-render
  const [responseColor, setResponseColor] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  // Retrieve the email from local storage
  let email = localStorage.getItem('email');

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Check if the entered value is a valid single-digit integer or backspace key
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      // If the entered value is an empty string (backspace key), focus on the previous input field
      if (value === "") {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }
  
      // If the entered value is valid and the current box is not the last one, move the focus to the next input field
      if (index < otp.length - 1 && value !== "") {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  
    // If the entered value is a digit and the current box is the last one, blur the input to prevent further input
    if (/^\d$/.test(value) && index === otp.length - 1) {
      e.target.blur();
    }
  };

  const handleVerification = async () => {
    try {
      if (!email) {
        setErrorMessage("Email not found in local storage.");
        return;
      }
       
      const otpResponse = await axios.post("http://127.0.0.1:8000/mdb/verify-otp", { email, otp: otp.join("") });  
      if (otpResponse.data.error) {
        setResponseMessage(otpResponse.data.error);
        setResponseColor("red");
      } else {
        const { success } = otpResponse.data;
        setResponseMessage(success);
        setResponseColor("green");
        localStorage.setItem('isVerified', true);
        setTimeout(() => {
          navigate("/Home"); // Navigate to the current route to trigger a re-render
          window.location.reload();
          
        }, 2000);
  
        // const { success } = otpResponse.data;
        if (otpResponse.data.success) {
          setResponseMessage(otpResponse.data.success);
          setResponseColor("green");
        } else {
          setResponseMessage("Failed to verify OTP. Please try again.");
          setResponseColor("red");
        }
      }
    } catch (error) {
      // Check if the error is due to login failure or OTP sending failure
      if (error.response && error.response.data) {
        setResponseMessage(error.response.data.message); // Set the specific error message returned by the server
      } else {
        setResponseMessage("An error occurred . Try Again Later");
      }
      setResponseColor("red");
    }
  };
      

  return (
    <VerificationContainer >
      <FormError style={{ color: responseColor }}>{responseMessage ? responseMessage : ""}</FormError>
      <Title>Enter Verification Code</Title>
      <InputContainer>
        {otp.map((value, index) => (
          <InputBox
            key={index}
            type="number"
            value={value}
            onChange={(e) => handleChange(e, index)}
            maxLength={1}
          />
        ))}
      </InputContainer>
      <VerifyButton onClick={handleVerification}>Verify</VerifyButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {verificationMessage && <p className="mt-4 text-green-500">{verificationMessage}</p>}
    </VerificationContainer>
  );
};

export default VerificationPage;
