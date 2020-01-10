import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <div style={{ homeBackground }}>
        <h2>Home Page</h2>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </div>
    </Layout>
  );
};

const homeBackground = {
  background:
    "linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%)",
  backgroundBlendMode: "soft-light, overlay, difference, normal",
  height: "1000px"
};

export default Index;
