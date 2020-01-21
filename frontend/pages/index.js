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

export default Index;
