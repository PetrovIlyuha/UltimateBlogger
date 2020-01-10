import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import { APP_NAME } from "../config";
import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

import { Navbar, Nav, NavItem, NavLink } from "reactstrap";

export const Footer = () => {
  return (
    <div>
      <div style={phantom}>
        <Navbar expand="xs" style={style}>
          <Link href="/">
            <NavLink className="font-weight-bold" style={navItem}>
              {APP_NAME} 🖋👨‍💻 &copy; {new Date().getFullYear()}
            </NavLink>
          </Link>
          <Nav
            className="ml-auto"
            navbar
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "200px"
            }}
          >
            <NavItem>
              <a href="http://facebook.com">
                <FaFacebookSquare style={navItem} />
              </a>
            </NavItem>
            <NavItem>
              <a href="http://instagram.com">
                <TiSocialInstagram style={navItem} />
              </a>
            </NavItem>
            <NavItem>
              <a href="http://github.com">
                <FaGithub style={navItem} />
              </a>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </div>
  );
};
const style = {
  background: "linear-gradient(to left, #911d14, #c42014)",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100vw"
};

const phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

const navItem = {
  color: "#eaeaea",
  fontSize: "1.2rem"
};

export default Footer;
