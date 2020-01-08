import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid" style={categoriesPageStyles}>
          <div className="row">
            <div className="col-md-12 py-5 text-center">
              <h2 style={{ color: "white" }}>Create New Blog</h2>
            </div>
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

const categoriesPageStyles = {
  backgroundColor: "#2f2347",
  height: "100vh"
};
export default Blog;
