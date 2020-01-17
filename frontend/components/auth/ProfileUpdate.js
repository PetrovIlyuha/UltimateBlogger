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

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    let userData = new FormData();
    userData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userData,
      error: false,
      success: false
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    updateProfile(token, userData).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Upload Profile Photo
          <input
            onChange={handleChange("photo")}
            type="file"
            accept="image/*"
            className="float-left"
            hidden
          />
        </label>
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
        <label className="font-weight-bold">About</label>
        <textarea
          type="text"
          className="form-control"
          onChange={handleChange("about")}
          value={about}
        />
      </div>
      <div>
        <label className="font-weight-bold">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-secondary mt-3">
          Submit Changes
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
