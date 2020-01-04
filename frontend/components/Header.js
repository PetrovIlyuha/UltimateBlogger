import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../config";
import { FaSignInAlt } from "react-icons/fa";
import { GiHeartInside } from "react-icons/gi";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar style={navStyles} expand="xs">
        <Link href="/">
          <NavLink style={navItem} className="font-weight-bold">
            {APP_NAME} 🖋
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" style={navIcons}>
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const navStyles = {
  backgroundColor: "#3a7bd5",
  width: "100vw"
};

const navItem = {
  color: "#eaeaea",
  fontSize: "1.4rem"
};

const navIcons = {
  display: "flex",
  justifyContent: "space-around",
  width: "180px",
  color: "#eaeaea",
  fontSize: "1.4rem"
};

export default Header;
