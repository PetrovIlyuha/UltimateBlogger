import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category.name} | {`${APP_NAME}`}
      </title>
      <meta
        name="description"
        content={`Actual programming turorials on ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Actual programming turorials on ${category.name}`}
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
                  {category.name}
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
        <article className="overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-4 font-weight-bold">
                  PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
                </h1>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center pt-4 pb-5">
                <p className="lead">
                  Best programming and web development blogs and tutorials on
                  React Node NextJs and JavaScript
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        "url(" +
                        "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg" +
                        ")"
                    }}
                  >
                    <h2 className="text-shadow text-center h1">React</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/react">
                      <a>
                        <h3 className="h1">React Js</h3>
                      </a>
                    </Link>
                    <p className="lead">
                      The world's most popular frontend web development library
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        "url(" +
                        "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg" +
                        ")"
                    }}
                  >
                    <h2 className="text-shadow text-center h1">Node</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/node">
                      <a>
                        <h3 className="h1">Node Js</h3>
                      </a>
                    </Link>
                    <p className="lead">
                      The worlds most popular backend development tool for
                      JavaScript Ninjas
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="flip flip-horizontal">
                  <div
                    className="front"
                    style={{
                      backgroundImage:
                        "url(" +
                        "https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg" +
                        ")"
                    }}
                  >
                    <h2 className="text-shadow text-center h1">Next</h2>
                  </div>
                  <div className="back text-center">
                    <Link href="/categories/nextjs">
                      <a>
                        <h3 className="h1">Next Js</h3>
                      </a>
                    </Link>
                    <p className="lead">
                      A Production ready web framework for building SEO React
                      apps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
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
export default Category;
