import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";

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
        // TODO: Save user token to cookie
        // TODO: Save user info to local storage
        // TODO: authenticate user
        authenticate(data, () => {
          if (isAuth && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
    console.log(values);
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

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
        <Button className="btn-primary">Sign In</Button>
      </Form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
};

export default SignInComponent;
