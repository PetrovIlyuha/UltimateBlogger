import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, [blogs]);

  const loadBlogs = () => {
    list(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm("Do You Confirm blog removal?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn-sm btn-warning m-3">Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div key={index} style={whiteFont}>
          <h3>{blog.title}</h3>
          <p className="lead pt-1 pb-1 mt-3" style={authoredBy}>
            >{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              Authored by {blog.postedBy.name} | Published
            </span>{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete Blog
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <h2 style={whiteFont} className="text-center mb-3">
        Update Blog / Delete Blog
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {message && <div className="alert alert-warning">{message}</div>}
            {showAllBlogs()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const whiteFont = {
  color: "white"
};

const authoredBy = {
  background:
    "linear-gradient(125deg, #FFFFFF 0%, #000000 100%), linear-gradient(200deg, #FFD9E8 0%, #FFD9E8 50%, #DE95BA calc(50% + 1px), #DE95BA 60%, #7F4A88 calc(60% + 1px), #7F4A88 75%, #4A266A calc(75% + 1px), #4A266A 100%), linear-gradient(113deg, #FFD9E8 0%, #FFD9E8 40%, #DE95BA calc(40% + 1px), #DE95BA 50%, #7F4A88 calc(50% + 1px), #7F4A88 70%, #4A266A calc(70% + 1px), #4A266A 100%)",
  backgroundBlendMode: "overlay, overlay, normal",

  color: "#9ad9ab",
  maxWidth: "350px",
  paddingLeft: "12px",
  fontSize: "0.9rem",
  borderRadius: "20px",
  fontFamily: "Arial",
  border: "2px solid red"
};

export default BlogRead;
