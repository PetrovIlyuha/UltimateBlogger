import fetch from "isomorphic-fetch";
import { API } from "../config";
import cookie from "js-cookie";
import Router from "next/router";

export const handleResponse = response => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: "/signin",
        query: {
          message: "Your session is expired. Please sign in"
        }
      });
    });
  } else {
    return;
  }
};

export const preSignup = user => {
  return fetch(`${API}/pre-signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

// Sign out method
export const signout = next => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET"
  })
    .then(response => {
      console.log("Sign out success");
    })
    .catch(err => console.log(err));
};

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};
// remove cookie
export const removeCookie = (key, value) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};
// get cookie
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};
// localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// remove LocalStorage
export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
// authenticate user by passing the data to cookie and localStorage
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};

export const forgotPassword = email => {
  return fetch(`${API}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const resetPassword = resetInfo => {
  return fetch(`${API}/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const loginWithGoogle = user => {
  return fetch(`${API}/google-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
