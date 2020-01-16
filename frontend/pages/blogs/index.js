import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card";

import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkip,
  router,
  username
}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {`${APP_NAME}`}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue laravel web-development redux"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest programming tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue laravel web-development redux"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/public/images/ultimablogger.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/public/images/ultimablogger.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMoreBlogs = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.allBlogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMoreBlogs}
          className="btn btn-primary btn-lg text-center"
        >
          Show more...
        </button>
      )
    );
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
          <a className="btn btn-danger mr-1 ml-1 mt-3">{tag.name}</a>
        </Link>
      );
    });
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <article
          key={index}
          style={{
            color: "white",
            marginTop: "2rem",
            borderRadius: "20px"
          }}
        >
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, index) => {
      return (
        <article key={index} style={{ color: "white", marginTop: "2rem" }}>
          <Card blog={blog} />
        </article>
      );
    });
  };

  return (
    <>
      {head()}
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
                  <hr style={{ borderColor: "white" }} />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </div>
          <div className="container-fluid mt-3 font-weight-bold">
            {showAllBlogs()}
          </div>
          <div className="container-fluid mt-3 font-weight-bold">
            {showLoadedBlogs()}
          </div>
          <div className="container-fluid text-center pb-3">
            {loadMoreButton()}
          </div>
        </main>
      </Layout>
    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return {
        blogs: data.allBlogs,
        categories: data.allCategories,
        tags: data.allTags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip
      };
    }
  });
};

const categoriesPageStyles = {
  paddingTop: "150px",
  background:
    "radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%)",
  backgroundBlendMode: "overlay, hard-light, normal",
  backgroundPosition: "center",
  backgroundRepear: "no-repeat",
  backgroundSize: "cover"
};

export default withRouter(Blogs); // getInitialProps
