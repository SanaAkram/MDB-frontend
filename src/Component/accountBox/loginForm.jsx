import React, { useState, useContext, useEffect } from "react";
import { Field, useFormik } from "formik";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import VerificationPage from "../verification/verificationpage";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import * as yup from "yup";
import axios from "axios";
import { AccountContext } from "./accountContext";
import PropTypes from 'prop-types';

export function LoginForm(props) {
  const navigate = useNavigate(); // Get the navigate function for redirection
  const { setUserLoggedIn } = useContext(AccountContext);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responseColor, setResponseColor] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // State variable to track OTP sending status

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if token exists, if yes, set user as logged in
      setUserLoggedIn(true);
    }
  }, []);
  const isotp = localStorage.getItem("otp_sent");

  const onSubmit = async (values) => {
    try {
      const loginResponse = await axios.post("http://127.0.0.1:8000/mdb/login/", values);
  
      if (loginResponse.data.error) {
        setResponseMessage(loginResponse.data.error);
        setResponseColor("red");
      } else {
        const { success, refresh, access } = loginResponse.data;
        setResponseMessage(success);
        setResponseColor("green");
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('email', values.email);
  
        const otpResponse = await axios.post("http://127.0.0.1:8000/mdb/verify-email", { email: values.email });
        // const { success } = otpResponse.data;
        if (otpResponse.data.success) {
          setResponseMessage(otpResponse.data.success);
          localStorage.setItem('otp_sent', 'success');
          setResponseColor("green");
        } else {
          setResponseMessage("Failed to send OTP to your email. Please try again.");
          setResponseColor("red");
        }
      }
    } catch (error) {
      // Check if the error is due to login failure or OTP sending failure
      if (error.response && error.response.data) {
        setResponseMessage(error.response.data.message); // Set the specific error message returned by the server
      } else {
        setResponseMessage("An error occurred during login. Try Again Later");
      }
      setResponseColor("red");
    }
  };
  
  

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    // validationSchema: validationSchema,
  });

   // Render VerificationPage component if OTP has been sent successfully
  if (isotp === "success") {
    return <VerificationPage />;
  }
  
  else {
    return (
      <BoxContainer>
        <FormError style={{ color: responseColor }}>{responseMessage ? responseMessage : ""}</FormError>
        <FormContainer onSubmit={formik.handleSubmit}>
          <FieldContainer>
            <Input
              name="email"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              <FieldError>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </FieldError>
            }
          </FieldContainer>
          <FieldContainer>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {
              <FieldError>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </FieldError>
            }
          </FieldContainer>
          <MutedLink href="#">Forgot Password?</MutedLink>
          <Marginer direction="vertical" margin="1em" />
          <SubmitButton type="submit" disabled={!formik.isValid}>
            Login
          </SubmitButton>
        </FormContainer>
        <Marginer direction="vertical" margin={5} />
        <MutedLink href="#">
          Dont have an Account?
          <BoldLink href="#" >
            sign up
          </BoldLink>
        </MutedLink>
      </BoxContainer>
    );


  }

}
