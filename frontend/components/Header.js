import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { FaSignInAlt } from "react-icons/fa";
import { GiHeartInside } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";
import { FaBlogger } from "react-icons/fa";
import { signout, isAuth } from "../actions/auth";
import Router from "next/router";
import NProgress from "nprogress";
import Search from "../components/blog/Search";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "../node_modules/nprogress/nprogress.css";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Navbar style={navStyles} expand="xs">
        <a href="/" style={navItem} className="font-weight-bold">
          {APP_NAME} 🖋👨‍💻
        </a>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" style={navIcons}>
            {!isAuth() && (
              <div style={navIcons}>
                <NavItem style={navSingleIcon}>
                  <a href="/user/crud/create" style={dashboardText}>
                    Create Blog
                  </a>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <a href="/blogs" style={dashboardText}>
                    All Blogs
                  </a>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/contact">
                    <NavLink>Contact Form</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/signin">
                    <FaSignInAlt />
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/signup">
                    <GiHeartInside />
                  </Link>
                </NavItem>
              </div>
            )}
            {isAuth() && isAuth().role === 0 && (
              <div style={navIcons}>
                <NavItem style={navSingleIcon}>
                  <a href="/user/crud/create" style={dashboardText}>
                    Create Blog
                  </a>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <a href="/blogs" style={dashboardText}>
                    All Blogs
                  </a>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/user">
                    <div style={dashboardText}>
                      🕛{isAuth().name}`s Dashboard
                    </div>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/contact">
                    <NavLink>Contact Form</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <GoSignOut
                    onClick={() => signout(() => Router.push(`/signin`))}
                  />
                </NavItem>
              </div>
            )}
            {isAuth() && isAuth().role === 1 && (
              <div style={navIcons}>
                <NavItem style={navSingleIcon}>
                  <Link href="/user/crud/create">
                    <NavLink>Create Blog</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/blogs">
                    <FaBlogger />
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/admin" style={dashboardText}>
                    <div>🕛{isAuth().name}`s Dashboard</div>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <Link href="/contact">
                    <NavLink>Contact Form</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={navSingleIcon}>
                  <GoSignOut
                    onClick={() => signout(() => Router.push(`/signin`))}
                  />
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

const navStyles = {
  position: "fixed",
  backgroundColor: "#263029",
  width: "100vw",
  zIndex: "100",
  borderBottom: "2px solid yellow",
  boxShadow: "-2px 1px 26px 2px rgba(12,230,106,0.93)"
};

const navItem = {
  color: "green",
  fontSize: "1.4rem",
  textShadow:
    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18, 2px 2px 2px rgba(206,89,55,0)"
};

const navIcons = {
  display: "grid",
  width: "440px",
  gridGap: "5px",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 20px",
  marginRight: "20px",
  alignItems: "center",
  alignSelf: "center",
  color: "lightyellow",
  fontSize: "1rem",
  cursor: "pointer",
  textShadow:
    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18, 2px 2px 2px rgba(206,89,55,0)"
};

const navSingleIcon = {
  textAlign: "center",
  color: "lightyellow",
  fontSize: "1rem",
  cursor: "pointer"
};
const dashboardText = {
  fontSize: "1rem",
  color: "lightyellow"
};

const dashboardName = {
  color: "green"
};

export default Header;
