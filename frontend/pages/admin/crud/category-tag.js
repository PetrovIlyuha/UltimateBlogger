import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid" style={categoriesPageStyles}>
          <div className="row">
            <div className="col-md-12 py-5 text-center">
              <h2 style={{ color: "white" }}>Manage Categories and Tags</h2>
            </div>
            <div className="col-md-4">
              <Category />
            </div>
            <div className="col-md-8">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

const categoriesPageStyles = {
  backgroundColor: "#2f2347",
  height: "100vh",
  paddingTop: "100px"
};

export default CategoryTag;
