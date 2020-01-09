import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";
import { API } from "../../config";

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
      <Link key={index} href={`/categories/${tag.slug}`}>
        <a className="btn btn-outline-info mr-1 ml-1 mt-3">{tag.name}</a>
      </Link>
    ));
  };

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2
              className="pt-3 pb-3 font-weight-bols"
              style={{ color: "white" }}
            >
              {blog.title}
            </h2>
          </a>
        </Link>
      </header>
      <section>
        <p
          className="mark ml-1 pt-2 pb-2"
          style={{
            background:
              "linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%)",
            backgroundBlendMode: "soft-light, overlay, difference, normal",
            color: "#9ad9ab",
            maxWidth: "300px",
            paddingLeft: "12px",
            fontSize: "0.9rem",
            borderRadius: "20px",
            fontFamily: "Arial"
          }}
        >
          Authored by {blog.postedBy.name} | Published{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section style={categoriesTabsGrid}>
        <p style={{ paddingTop: "15px" }}>Categories:</p>
        <div>{showBlogCategories(blog)}</div>
        <p style={{ paddingTop: "15px" }}>Tags:</p>
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

const blogPhoto = { maxHeight: "280px", width: "auto" };

export default Card;
