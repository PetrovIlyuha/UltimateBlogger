import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid" style={userPageStyles}>
          <div className="row">
            <div
              className="col-md-12 py-5 text-center"
              style={{ marginTop: "100px" }}
            >
              <h2>User's Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item" style={listItemAdminPanel}>
                  <Link href="user/crud/create">
                    <a style={linkStyled}>Create Blog</a>
                  </Link>
                </li>

                <li className="list-group-item" style={listItemAdminPanel}>
                  <Link href="user/crud/blogs">
                    <a style={linkStyled}>Update/Delete Blogs</a>
                  </Link>
                </li>

                <li className="list-group-item" style={listItemAdminPanel}>
                  <Link href="user/update">
                    <a style={linkStyled}>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

const userPageStyles = {
  background:
    "linear-gradient(123deg, #FFFCAC 0%, #FFFFFF 67%), linear-gradient(180deg, #D8D8D8 0%, #6B0000 100%), linear-gradient(142deg, #F9F5F0 0%, #F9F5F0 33%, #F2EAD3 calc(33% + 1px), #F2EAD3 56%, #F4991A calc(56% + 1px), #F4991A 62%, #321313 calc(62% + 1px), #321313 100%)",
  backgroundBlendMode: "multiply, overlay, normal",
  height: "100vh"
};

const listItemAdminPanel = {
  background: "linear-gradient(to left, #c31432, #240b36)"
};
const linkStyled = {
  color: "white",
  fontWeight: "bold"
};
export default UserIndex;
