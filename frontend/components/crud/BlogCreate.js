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
        <li className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
            key={index}
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
        <li className="list-unstyled">
          <input
            onChange={handleToggleTags(tag._id)}
            type="checkbox"
            className="mr-2"
            key={index}
          />
          <label className="form-check-label">{tag.name}</label>
        </li>
      ))
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label style={{ color: "white" }}>Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
            value={title}
          />
        </div>

        <div className="form-group" style={yellowPaleBg}>
          <ReactQuill
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            value={body}
            placeholder="Write something inspiring..."
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Publish Blog
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <hr />
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

const whiteText = {
  color: "white"
};

const yellowPaleBg = {
  backgroundColor: "#f8fcbd"
};
const scrollableList = {
  maxHeight: "200px",
  overflowY: "scroll"
};
CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"]
  ]
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block"
];

export default withRouter(CreateBlog);
