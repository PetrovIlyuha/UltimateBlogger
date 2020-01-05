import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 py-5 text-center">
              <h2>Manage Categories and Tags</h2>
            </div>
            <div className="col-md-4">
              <p>Categories</p>
            </div>
            <div className="col-md-8">
              <p>Tags</p>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
