import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { singleBlog, updateBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import { API } from "../../config";

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // checked categories
  const [checkedTags, setCheckedTags] = useState([]); // checked tags
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
    body: ""
  });

  const { error, success, formData, title } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = blogCategories => {
    let categoriesArray = [];
    blogCategories.map((category, index) => {
      categoriesArray.push(category._id);
    });
    setChecked(categoriesArray);
  };

  const setTagsArray = blogTags => {
    let tagsArray = [];
    blogTags.map((tag, index) => {
      tagsArray.push(tag._id);
    });
    setCheckedTags(tagsArray);
  };

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
    const clickedTag = checkedTags.indexOf(tag);
    const allTags = [...checkedTags];
    if (clickedTag === -1) {
      allTags.push(tag);
    } else {
      allTags.splice(clickedTag, 1);
    }
    setCheckedTags(allTags);
    formData.set("tags", allTags);
  };

  const findOutCategory = c => {
    const result = checked.includes(c);
    if (result) {
      return true;
    }
    return false;
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
            checked={findOutCategory(c._id)}
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const findOutTags = tag => {
    const result = checkedTags.includes(tag);
    if (result) {
      return true;
    }
    return false;
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
            checked={findOutTags(tag._id)}
          />
          <label className="form-check-label">{tag.name}</label>
        </li>
      ))
    );
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = e => {
    setBody(e);
    formData.set("body", e);
  };

  const editBlog = e => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled "${data.title}" was updated successfully!`
        });
        if (isAuth() && isAuth().role === 1) {
          //   Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          //   Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user`);
        }
      }
    });
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

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
        <div>
          <button type="submit" className="btn btn-primary">
            Update Blog
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5 text-white">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            {showSuccess()}
            {showError()}
          </div>

          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: "100%" }}
            />
          )}
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
  minHeight: "300px",
  color: "black"
};

const scrollableList = {
  maxHeight: "200px",
  overflowY: "scroll"
};

export default withRouter(BlogUpdate);
