import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import LoginGoogle from "./LoginGoogle";

const SignInComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });
  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loaging: false });
      } else {
        authenticate(data, () => {
          if (isAuth && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => {
    return loading ? <div className="alert alert-info">Loading...</div> : "";
  };
  const showError = () => {
    return error ? <div className="alert alert-danger">{error}</div> : "";
  };
  const showMessage = () => {
    return message ? <div className="alert alert-info">{message}</div> : "";
  };

  const signinForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            onChange={handleChange("email")}
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type={password}
            onChange={handleChange("password")}
            value={password}
            name="password"
            id="password"
            placeholder="Choose Password"
          />
        </FormGroup>
        <div
          style={{
            display: "flex",
            width: "450px",
            justifyContent: "space-between"
          }}
        >
          <Button className="btn-primary">Sign In</Button>
          <LoginGoogle />
        </div>
      </Form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger">Forgot Password</a>
      </Link>
    </>
  );
};

export default SignInComponent;
