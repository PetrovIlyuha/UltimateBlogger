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

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
    body: ""
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
        }
      });
    }
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

  const editBlog = () => {
    console.log("update blog");
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
            <p>Show success and error messages</p>
          </div>
        </div>
        <div className="col-md-4 text-white">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
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
