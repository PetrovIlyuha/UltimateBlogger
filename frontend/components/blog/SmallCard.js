import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{ maxHeight: "auto", width: "100%" }}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5
              className="card-title"
              style={{ color: "black", cursor: "pointer" }}
            >
              {blog.title}
            </h5>
          </Link>
          <p
            className="card-text"
            style={{ color: "black", maxWidth: "380px" }}
          >
            {renderHTML(blog.excerpt.substring(0, 60) + "...")}
          </p>
        </section>
      </div>

      <div className="card-body">
        <p className="lead pt-1 pb-1 mt-3" style={authoredBy}>
          >{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>
            Authored by{" "}
            <Link href={`/`}>
              <a>{blog.postedBy.name}</a>
            </Link>{" "}
            | Published
          </span>{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </div>
    </div>
  );
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

export default SmallCard;
