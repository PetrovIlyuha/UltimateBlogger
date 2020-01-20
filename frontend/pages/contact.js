import Layout from "../components/Layout";
import Link from "next/link";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div style={homeBackground}>
        <main style={{ paddingTop: "100px" }} className="text-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h2 className="text-white">Contact Form</h2>
                <hr style={{ borderColor: "white" }} />
                <ContactForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

const homeBackground = {
  background:
    "linear-gradient(328.78deg, #030086 14.45%, #BD6177 84.36%), linear-gradient(301.28deg, #209B4A 0%, #7000FF 100%), radial-gradient(100% 138.56% at 100% 0%, #D50000 0%, #00FFE0 100%), radial-gradient(100% 148.07% at 0% 0%, #D50000 0%, #00FFFF 100%)",
  backgroundBlendMode: "soft-light, overlay, difference, normal"
};

export default Contact;
