import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { links } from "../../assets/data";
import logoImage from "../../assets/images/logo_small.png";

import "./header.css";

const Header = () => {
  return (
    <Navbar sticky="top" bg="white" expand="lg" style={{ height: "65px" }}>
      <Container>
        <img
          src={logoImage}
          alt="logo"
          width={48}
          height={48}
          style={{ marginRight: "20px" }}
        />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </Nav>
          <Nav>
            <Link to={"#"}>Login</Link>
            <Link to={"#"} style={{ marginLeft: "10px" }}>
              Register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
