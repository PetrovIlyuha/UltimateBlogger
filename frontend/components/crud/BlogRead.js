import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const BlogRead = () => {
  return (
    <React.Fragment>
      <p style={whiteFont}>Update Blog / Delete Blog</p>
    </React.Fragment>
  );
};

const whiteFont = {
  color: "white"
};
export default BlogRead;
