import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <main className="text-center">
        <div style={homeBackground}>
          <div
            style={{
              position: "relative",
              top: "30vh",
              color: "yellow",
              fontSize: "4rem"
            }}
          >
            Ultimate Blogging
          </div>{" "}
          <Link href="/signin">
            <a style={{ fontSize: "2rem", color: "white" }}>Sign In</a>
          </Link>
        </div>
      </main>
      {/* Cards Section */}
      <article className="overflow-hidden" style={cards}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="flip flip-horizontal">
                <div
                  className="front"
                  style={{
                    backgroundImage:
                      "url(" +
                      "https://www.robinwieruch.de/static/be0b8b8d69b5688f7bfd49d99dc73f1b/2b1a3/banner.jpg" +
                      ")"
                  }}
                >
                  <h2 className="text-shadow text-center h1">React</h2>
                </div>
                <div className="back text-center">
                  <Link href="/categories/react-hooks">
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
                      "https://miro.medium.com/max/730/0*YOZ8JZqYaWrpE3Fe.png" +
                      ")"
                  }}
                >
                  <h2 className="text-shadow text-center h1">Node</h2>
                </div>
                <div className="back text-center">
                  <Link href="/categories/node.js">
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
                      "https://storage.googleapis.com/hackersandslackers-cdn/2019/03/graphql-1-3.jpg" +
                      ")"
                  }}
                >
                  <h2 className="text-shadow text-center h1">Graph QL</h2>
                </div>
                <div className="back text-center">
                  <Link href="/categories/graphql">
                    <a>
                      <h3 className="h1">GraphQL</h3>
                    </a>
                  </Link>
                  <p className="lead">
                    GraphQL is a query language for your API, and a server-side
                    runtime for executing queries by using a type system you
                    define for your data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <style jsx>{`
        .flip {
          position: relative;
        }
        .flip > .front,
        .flip > .back {
          display: block;
          transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transition-duration: 0.5s;
          transition-property: transform, opacity;
        }
        .flip > .front {
          transform: rotateY(0deg);
        }
        .flip > .back {
          position: absolute;
          opacity: 0;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          transform: rotateY(-180deg);
        }
        .flip:hover > .front {
          transform: rotateY(180deg);
        }
        .flip:hover > .back {
          opacity: 1;
          transform: rotateY(0deg);
        }
        .flip.flip-vertical > .back {
          transform: rotateX(-180deg);
        }
        .flip.flip-vertical:hover > .front {
          transform: rotateX(180deg);
        }
        .flip.flip-vertical:hover > .back {
          transform: rotateX(0deg);
        }
        .flip {
          position: relative;
          display: inline-block;
          margin-right: 2px;
          margin-bottom: 1em;
          width: 100%;
          /*width: 400px;*/
        }
        .flip > .front,
        .flip > .back {
          display: block;
          color: white;
          width: inherit;
          background-size: cover !important;
          background-position: center !important;
          height: 220px;
          padding: 1em 2em;
          background: #313131;
          border-radius: 10px;
        }
        .flip > .front p,
        .flip > .back p {
          font-size: 0.9125rem;
          line-height: 160%;
          color: #999;
        }
        .text-shadow {
          text-shadow: 1px 1px rgba(0, 0, 0, 0.04), 2px 2px rgba(0, 0, 0, 0.04),
            3px 3px rgba(0, 0, 0, 0.04), 4px 4px rgba(0, 0, 0, 0.04),
            0.125rem 0.125rem rgba(0, 0, 0, 0.04), 6px 6px rgba(0, 0, 0, 0.04),
            7px 7px rgba(0, 0, 0, 0.04), 8px 8px rgba(0, 0, 0, 0.04),
            9px 9px rgba(0, 0, 0, 0.04), 0.3125rem 0.3125rem rgba(0, 0, 0, 0.04),
            11px 11px rgba(0, 0, 0, 0.04), 12px 12px rgba(0, 0, 0, 0.04),
            13px 13px rgba(0, 0, 0, 0.04), 14px 14px rgba(0, 0, 0, 0.04),
            0.625rem 0.625rem rgba(0, 0, 0, 0.04), 16px 16px rgba(0, 0, 0, 0.04),
            17px 17px rgba(0, 0, 0, 0.04), 18px 18px rgba(0, 0, 0, 0.04),
            19px 19px rgba(0, 0, 0, 0.04), 1.25rem 1.25rem rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </Layout>
  );
};

const homeBackground = {
  // backgroundImage: "url('../public/images/blogs.jpeg)",
  width: "100vw",
  height: "100%",
  // backgroundRepeat: "no-repeat",
  // backgroundSize: "cover"
  background:
    "linear-gradient(235deg, #FFFFFF 0%, #000F25 100%), linear-gradient(180deg, #6100FF 0%, #000000 100%), linear-gradient(235deg, #FFA3AC 0%, #FFA3AC 40%, #00043C calc(40% + 1px), #00043C 60%, #005D6C calc(60% + 1px), #005D6C 70%, #00C9B1 calc(70% + 1px), #00C9B1 100%), linear-gradient(125deg, #FFA3AC 0%, #FFA3AC 40%, #00043C calc(40% + 1px), #00043C 60%, #005D6C calc(60% + 1px), #005D6C 70%, #00C9B1 calc(70% + 1px), #00C9B1 100%)",
  backgroundBlendMode: "soft-light, screen, darken, normal",
  position: "absolute",
  display: "flex",
  flexDirection: "column"
};

const cards = {
  marginTop: "420px"
};

export default Index;
