import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // checked categories
  const [checkedTag, setCheckedTag] = useState([]); // checked tags

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    e.preventDefault();
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title} was created"`
        });
        setBody("");
        setChecked([]);
        setCheckedTag([]);
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = event => {
    setBody(event);
    formData.set("body", event);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(event));
    }
  };

  const handleToggle = category => () => {
    setValues({ ...values, error: "" });
    const clickedCategory = checked.indexOf(category);
    const all = [...checked];
    if (clickedCategory === -1) {
      all.push(category);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChecked(all);
    formData.set("categories", all);
  };

  const handleToggleTags = tag => () => {
    setValues({ ...values, error: "" });
    const clickedTag = checkedTag.indexOf(tag);
    const allTags = [...checkedTag];
    if (clickedTag === -1) {
      allTags.push(tag);
    } else {
      allTags.splice(clickedTag, 1);
    }
    setCheckedTag(allTags);
    formData.set("tags", allTags);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, index) => (
        <li className="list-unstyled" key={index}>
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag, index) => (
        <li className="list-unstyled" key={index}>
          <input
            onChange={handleToggleTags(tag._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{tag.name}</label>
        </li>
      ))
    );
  };

  const showError = () => {
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>;
  };

  const showSuccess = () => {
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>;
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog} className="ql-editor">
        <div className="form-group">
          <label style={{ color: "white" }}>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
            value={title}
          />
        </div>

        <div className="form-group" style={editorArea}>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something inspiring..."
            onChange={handleBody}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit" className="btn btn-primary">
            Publish Blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {error && showError()}
            {success && showSuccess()}
          </div>
          <hr style={{ borderColor: "white" }} />
        </div>
        <div className="col-md-4 text-white">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr style={{ borderColor: "white" }} />
              <small>Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr style={{ borderColor: "white" }} />
            <div>
              <ul style={scrollableList}>{showCategories()}</ul>
            </div>
          </div>
          <div>
            <h5>Tags</h5>
            <hr style={{ borderColor: "white" }} />
            <div className="text-white">
              <ul style={scrollableList}>{showTags()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const editorArea = {
  backgroundColor: "lightyellow",
  minHeight: "300px"
};

const scrollableList = {
  maxHeight: "200px",
  overflowY: "scroll"
};

export default withRouter(CreateBlog);
