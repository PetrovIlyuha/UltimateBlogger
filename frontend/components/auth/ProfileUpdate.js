import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: ""
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData
  } = values;

  const initUserData = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about
        });
      }
    });
  };

  useEffect(() => {
    initUserData();
  }, []);

  const handleChange = name => event => {};

  const handleSubmit = event => {};

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted font-weight-bold">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChange("photo")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted font-weight-bold">User Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("username")}
          value={username}
        />
      </div>
      <div className="form-group">
        <label className="text-muted font-weight-bold">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted font-weight-bold">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-white font-weight-bold">About</label>
        <textarea
          type="text"
          className="form-control"
          onChange={handleChange("about")}
          value={about}
        />
      </div>
      <div>
        <label className="text-white font-weight-bold">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8">{profileUpdateForm()}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
