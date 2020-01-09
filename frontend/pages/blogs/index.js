import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Layout from "../../components/Layout";
import Card from "../../components/blog/Card";

import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <article key={index} style={{ color: "white" }}>
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((category, index) => {
      return (
        <Link href={`/categories/${category.slug}`} key={index}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{category.name}</a>
        </Link>
      );
    });
  };

  const showAllTags = () => {
    return tags.map((tag, index) => {
      return (
        <Link href={`/tags/${tag.slug}`} key={index}>
          <a className="btn btn-secondary mr-1 ml-1 mt-3">{tag.name}</a>
        </Link>
      );
    });
  };
  return (
    <Layout>
      <main style={categoriesPageStyles}>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1
                className="display-4 font-weight-bold text-center"
                style={{ color: "#4f1c11" }}
              >
                Programming Blogs
              </h1>
            </div>
            <section>
              <div className="pb-5">
                {showAllCategories()}
                <hr style={{ borderColor: "red" }} />
                {showAllTags()}
              </div>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.allBlogs,
        categories: data.allCategories,
        tags: data.allTags,
        size: data.size
      };
    }
  });
};

const categoriesPageStyles = {
  background:
    "radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)",
  backgroundBlendMode: "overlay, hard-light, normal"
};

export default Blogs; // getInitialProps
