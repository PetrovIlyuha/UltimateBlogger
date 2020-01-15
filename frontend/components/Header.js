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
    <div>
      <Navbar style={navStyles} expand="xs">
        <Link href="/">
          <NavLink style={navItem} className="font-weight-bold">
            {APP_NAME} 🖋👨‍💻
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto">
            {!isAuth() && (
              <div style={navIcons}>
                <NavItem>
                  <Link href="/blogs">
                    <FaBlogger />
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signin">
                    <FaSignInAlt />
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <GiHeartInside />
                  </Link>
                </NavItem>
              </div>
            )}
            {isAuth() && isAuth().role === 0 && (
              <div style={navIcons}>
                <NavItem>
                  <Link href="/blogs">
                    <FaBlogger />
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/user">
                    <div style={dashboardText}>
                      🕛{isAuth().name}`s Dashboard
                    </div>
                  </Link>
                </NavItem>
                <NavItem>
                  <GoSignOut
                    onClick={() => signout(() => Router.push(`/signin`))}
                  />
                </NavItem>
              </div>
            )}
            {isAuth() && isAuth().role === 1 && (
              <div style={navIcons}>
                <NavItem>
                  <Link href="/blogs">
                    <FaBlogger />
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/admin" style={dashboardText}>
                    <div>🕛{isAuth().name}`s Dashboard</div>
                  </Link>
                </NavItem>
                <NavItem>
                  <GoSignOut
                    onClick={() => signout(() => Router.push(`/signin`))}
                  />
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginRight: "30px",
  alignItems: "center",
  maxWidth: "350px",
  color: "lightyellow",
  fontSize: "1.5rem",
  cursor: "pointer",
  textShadow:
    "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #49ff18, 0 0 30px #49FF18, 0 0 40px #49FF18, 0 0 55px #49FF18, 0 0 75px #49ff18, 2px 2px 2px rgba(206,89,55,0)"
};

const dashboardText = {
  fontSize: "1.2rem",
  color: "lightyellow"
};

const dashboardName = {
  color: "green"
};

export default Header;
