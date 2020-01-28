import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import { signup, preSignup } from "../../actions/auth";
import Link from "next/link";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });
  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    preSignup(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loaging: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loaging: false,
          message: data.message,
          showForm: false
        });
      }
    });
    console.log(values);
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

  const signupForm = () => {
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            onChange={handleChange("name")}
            value={name}
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
          />
        </FormGroup>
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
        <Button className="btn-primary">Sign Up</Button>
      </Form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger">Forgot Password</a>
      </Link>
    </>
  );
};

export default SignupComponent;
