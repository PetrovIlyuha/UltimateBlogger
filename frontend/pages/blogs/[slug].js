import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import SmallCard from "../../components/blog/SmallCard";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const showRelatedBlogs = () => {
    return related.map((blog, index) => (
      <div className="col-md-4" key={index}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  const head = () => (
    <Head>
      <title>
        {blog.title} | {`${APP_NAME}`}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

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
      {head()}
      <Layout>
        <main style={singleBlogPageStyles}>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row">
                  <div className="col-lg-12 mt-3 text-center">
                    <img
                      src={`${API}/blog/photo/${blog.slug}`}
                      alt={blog.title}
                      className="img img-fluid featured-image"
                      style={{ borderRadius: "30px" }}
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3
                  className="pt-3 text-center font-weight-bold"
                  style={{ color: "white" }}
                >
                  {blog.title}
                </h3>
                <p className="lead pt-1 pb-1 mt-3" style={authoredBy}>
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
            <div className="container" style={bodyStyles}>
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5" style={bodyStyles}>
              <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4>
              <hr style={{ borderColor: "white" }} />
              <div className="row">{showRelatedBlogs()}</div>
            </div>
            <div className="container pb-5" style={bodyStyles}>
              <p>Show comments</p>
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
      return { blog: data, query };
    }
  });
};

const singleBlogPageStyles = {
  paddingTop: "100px",
  background:
    "linear-gradient(114.95deg, rgba(235, 0, 255, 0.5) 0%, rgba(0, 71, 255, 0) 34.35%), linear-gradient(180deg, #004B5B 0%, #FFA7A7 100%), linear-gradient(244.35deg, #FFB26A 0%, #3676B1 50.58%, #00A3FF 100%), linear-gradient(244.35deg, #FFFFFF 0%, #004A74 49.48%, #FF0000 100%), radial-gradient(100% 233.99% at 0% 100%, #B70000 0%, #AD00FF 100%), linear-gradient(307.27deg, #219D87 0.37%, #2650BA 50.19%, #2800C6 100%), radial-gradient(100% 140% at 100% 0%, #FF00C7 0%, #006C7A 49.48%, #760000 100%)",
  backgroundBlendMode:
    "hard-light, overlay, overlay, overlay, difference, difference, normal"
};

const categoriesTabsGrid = {
  display: "grid",
  gridTemplateColumns: "20% 80%",
  alignItems: "center",
  justifyItems: "start",
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
const bodyStyles = {
  color: "white"
};

export default SingleBlog;
