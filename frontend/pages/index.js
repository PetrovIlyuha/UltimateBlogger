import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h2>Home Page</h2>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
    </Layout>
  );
};

export default Index;
