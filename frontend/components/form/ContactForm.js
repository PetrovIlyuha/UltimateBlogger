import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = () => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = e => {
    e.preventDefault();
  };
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
      error: false,
      success: false,
      buttonText: "Send Message"
    });
  };

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} style={formStyled}>
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            rows="10"
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="text"
            value={email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  return <>{contactForm()}</>;
};

const formStyled = {
  background:
    "linear-gradient(238.72deg, #EBFF00 0%, #8F00FF 100%), linear-gradient(64.82deg, #AD00FF 0%, #FF0000 100%), linear-gradient(65.03deg, #00FFFF 0%, #FF0000 99.79%), radial-gradient(67.08% 100% at 50% 100%, #FF00C7 0%, #50005E 100%), radial-gradient(100% 140% at 100% 0%, #5ED500 0%, #2200AA 100%)",
  backgroundBlendMode: "color-dodge, difference, lighten, color-dodge, normal",
  padding: "20px",
  marginBottom: "70px",
  borderRadius: "4%"
};

export default ContactForm;
