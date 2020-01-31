import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { loginWithGoogle } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import GoogleLogin from "react-google-login";

const LoginGoogle = () => {
  const responseGoogle = response => {
    console.log(response);
  };
  return (
    <div className="login-with-google-div">
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
