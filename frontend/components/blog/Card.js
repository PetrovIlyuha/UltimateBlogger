import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";
import { API } from "../../config";
import { userPublicProfile } from "../../actions/user";

const Card = ({ blog }) => {
  const showBlogCategories = blog => {
    return blog.categories.map((category, index) => (
      <Link key={index} href={`/categories/${category.slug}`}>
        <a className="btn btn-info mr-1 ml-1 mt-3">{category.name}</a>
      </Link>
    ));
  };

  const showBlogTags = blog => {
    return blog.tags.map((tag, index) => (
      <Link key={index} href={`/tags/${tag.slug}`}>
        <a className="btn btn-outline-success mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2
              className="pt-3 pb-3 text-center font-weight-bold"
              style={{ color: "white" }}
            >
              {blog.title}
            </h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="lead pt-1 pb-1 mt-3" style={authoredBy}>
          >{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>
            Authored by{" "}
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>{blog.postedBy.name}</a>
            </Link>{" "}
            | Published
          </span>{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section style={categoriesTabsGrid}>
        <p style={{ paddingTop: "15px", paddingLeft: "20px" }}>Categories:</p>
        <div>{showBlogCategories(blog)}</div>
        <p style={{ paddingTop: "15px", paddingLeft: "20px" }}>Tags:</p>
        <div>{showBlogTags(blog)}</div>
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <img
                className="img img-fluid"
                style={blogPhoto}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
                style={{ height: "auto", width: "100%" }}
              />
            </Link>
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary mt-2">Read More</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

const categoriesTabsGrid = {
  display: "grid",
  gridTemplateColumns: "20% 80%",
  alignItems: "center",
  justifyItems: "start"
};

const authoredBy = {
  background:
    "linear-gradient(125deg, #FFFFFF 0%, #000000 100%), linear-gradient(200deg, #FFD9E8 0%, #FFD9E8 50%, #DE95BA calc(50% + 1px), #DE95BA 60%, #7F4A88 calc(60% + 1px), #7F4A88 75%, #4A266A calc(75% + 1px), #4A266A 100%), linear-gradient(113deg, #FFD9E8 0%, #FFD9E8 40%, #DE95BA calc(40% + 1px), #DE95BA 50%, #7F4A88 calc(50% + 1px), #7F4A88 70%, #4A266A calc(70% + 1px), #4A266A 100%)",
  backgroundBlendMode: "overlay, overlay, normal",

  color: "#9ad9ab",
  maxWidth: "450px",
  paddingLeft: "12px",
  fontSize: "0.9rem",
  borderRadius: "20px",
  fontFamily: "Arial",
  border: "2px solid red"
};

const blogPhoto = { maxHeight: "280px", width: "auto", marginLeft: "20px" };

export default Card;
