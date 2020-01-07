import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { FaSignInAlt } from "react-icons/fa";
import { GiHeartInside } from "react-icons/gi";
import { GoSignOut } from "react-icons/go";
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
                  <Link href="/user">
                    <NavLink style={dashboardText}>
                      🕛{isAuth().name}`s Dashboard
                    </NavLink>
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
                  <Link href="/admin">
                    <NavLink>🕛{isAuth().name}`s Dashboard</NavLink>
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
  backgroundColor: "#263029",
  // width: "100vw",
  borderBottom: "2px solid yellow",
  boxShadow: "-2px 1px 26px 2px rgba(12,230,106,0.93)"
};

const navItem = {
  color: "#eaeaea",
  fontSize: "1.4rem"
};

const navIcons = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "200px",
  color: "#eaeaea",
  fontSize: "1.4rem",
  cursor: "pointer"
};

const dashboardText = {
  fontSize: "0.9rem"
};

const navIconSingle = {
  color: "#eaeaea",
  fontSize: "1.4rem",
  cursor: "pointer"
};

export default Header;
