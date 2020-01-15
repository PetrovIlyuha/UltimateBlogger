import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card";
import { singleTag } from "../../actions/tags";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {`${APP_NAME}`}
      </title>
      <meta
        name="description"
        content={`Actual programming turorials on ${tag.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Actual programming turorials on ${tag.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
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
  return (
    <>
      <Layout>
        {head()}
        <main style={categoriesPageStyles}>
          <div className="container-fluid text-center">
            <header>
              <div className="col-xs-12 pt-3">
                <h1 className="display-4 wont-weight-bold text-white">
                  {tag.name}
                </h1>
                <section style={{ color: "white" }}>
                  {blogs.map((blog, index) => {
                    return (
                      <div>
                        <Card blog={blog} key={index} />
                        <hr style={{ borderColor: "white" }} />
                      </div>
                    );
                  })}
                </section>
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

const categoriesPageStyles = {
  background:
    "linear-gradient(114.95deg, rgba(235, 0, 255, 0.5) 0%, rgba(0, 71, 255, 0) 34.35%), linear-gradient(180deg, #004B5B 0%, #FFA7A7 100%), linear-gradient(244.35deg, #FFB26A 0%, #3676B1 50.58%, #00A3FF 100%), linear-gradient(244.35deg, #FFFFFF 0%, #004A74 49.48%, #FF0000 100%), radial-gradient(100% 233.99% at 0% 100%, #B70000 0%, #AD00FF 100%), linear-gradient(307.27deg, #219D87 0.37%, #2650BA 50.19%, #2800C6 100%), radial-gradient(100% 140% at 100% 0%, #FF00C7 0%, #006C7A 49.48%, #760000 100%)",
  backgroundBlendMode:
    "hard-light, overlay, overlay, overlay, difference, difference, normal",
  paddingTop: "100px"
};
export default Tag;
