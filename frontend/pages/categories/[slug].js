import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const Category = ({ category, blogs }) => {
  return (
    <>
      <Layout>
        <main style={{ paddingTop: "100px" }}>
          <div className="container-fluid text-center">
            <header>
              <div className="col-xs-12 pt-3">
                <h1 className="display-4 wont-weight-bold">{category.name}</h1>
                {blogs.map((blog, index) => (
                  <Card blog={blog} key={index} />
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;
