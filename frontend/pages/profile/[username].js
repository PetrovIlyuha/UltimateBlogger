import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {`${APP_NAME}`}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
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

  const showUserBlogs = () => {
    return blogs.map((blog, index) => {
      return (
        <div className="mt-4 mb-4" key={index}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      {head()}
      <Layout>
        <div style={profileBg}>
          <div className="container">
            <div className="row pt-3">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h5>{user.name}</h5>
                        <p className="text-muted">
                          Joined {moment(user.createdAt).fromNow()}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <img
                          src={`${API}/user/photo/${user.username}`}
                          className="img img-fluid img-thumbnail mb-3"
                          style={{ maxHeight: "100px", maxWidth: "100%" }}
                          alt="user profile"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container pb-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4">
                      Recent Posts by{" "}
                      <span style={{ color: "yellow" }}>{user.name}</span>
                    </h5>
                    <br />
                    <p>{showUserBlogs()}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                      Message {user.name}
                    </h5>
                    <br />
                    <p>Contact Form</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

const profileBg = {
  background:
    " linear-gradient(123deg, #FFFFFF 0%, #00B2FF 100%), linear-gradient(236deg, #BAFF99 0%, #005E64 100%), linear-gradient(180deg, #FFFFFF 0%, #002A5A 100%), linear-gradient(225deg, #0094FF 20%, #BFF4ED 45%, #280F34 45%, #280F34 70%, #FF004E 70%, #E41655 85%, #B30753 85%, #B30753 100%), linear-gradient(135deg, #0E0220 15%, #0E0220 35%, #E40475 35%, #E40475 60%, #48E0E4 60%, #48E0E4 68%, #D7FBF6 68%, #D7FBF6 100%)",
  backgroundBlendMode: "overlay, overlay, overlay, darken, normal",
  height: "100vh"
};
export default UserProfile;
