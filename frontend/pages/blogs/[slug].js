import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";

const SingleBlog = ({ blog }) => {
  const showBlogCategories = blog => {
    return blog.categories.map((category, index) => (
      <Link key={index} href={`/categories/${category.slug}`}>
        <a className="btn btn-info mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));
  };

  const showBlogTags = blog => {
    return blog.tags.map((tag, index) => (
      <Link key={index} href={`/categories/${tag.slug}`}>
        <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };
  return (
    <>
      <Layout>
        <main style={singleBlogPageStyles}>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <p
                  className="lead pt-1 pb-1 mt-3"
                  style={{
                    background:
                      "linear-gradient(125deg, #FFFFFF 0%, #000000 100%), linear-gradient(200deg, #FFD9E8 0%, #FFD9E8 50%, #DE95BA calc(50% + 1px), #DE95BA 60%, #7F4A88 calc(60% + 1px), #7F4A88 75%, #4A266A calc(75% + 1px), #4A266A 100%), linear-gradient(113deg, #FFD9E8 0%, #FFD9E8 40%, #DE95BA calc(40% + 1px), #DE95BA 50%, #7F4A88 calc(50% + 1px), #7F4A88 70%, #4A266A calc(70% + 1px), #4A266A 100%)",
                    backgroundBlendMode: "overlay, overlay, normal",
                    filter: "blur(80%)",
                    color: "#9ad9ab",
                    maxWidth: "350px",
                    paddingLeft: "12px",
                    fontSize: "0.9rem",
                    borderRadius: "20px",
                    fontFamily: "Arial",
                    border: "2px solid red"
                  }}
                >
                  >{" "}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Authored by {blog.postedBy.name} | Published
                  </span>{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>
                <section style={categoriesTabsGrid}>
                  <p style={{ paddingTop: "25px", paddingLeft: "20px" }}>
                    Categories:
                  </p>
                  <div>{showBlogCategories(blog)}</div>
                  <p style={{ paddingTop: "15px", paddingLeft: "20px" }}>
                    Tags:
                  </p>
                  <div>{showBlogTags(blog)}</div>
                </section>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

const singleBlogPageStyles = {
  paddingTop: "100px"
};

const categoriesTabsGrid = {
  display: "grid",
  gridTemplateColumns: "20% 80%",
  alignItems: "center",
  justifyItems: "start"
};

export default SingleBlog;
