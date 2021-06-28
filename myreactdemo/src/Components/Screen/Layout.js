import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
class Layout extends React.Component {
  render() {
    return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand>
  <Link className="nav-link" to="/">
            <h2>IMS</h2>
          </Link>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Departments" id="collasible-nav-dropdown">
      <Link className="p-2" to="/departments">
                  Departments
      </Link>
        <NavDropdown.Divider />
        <Link className="p-2" to="/Createdepartment">
                  Add Department
                </Link>
      </NavDropdown>
      <NavDropdown title="Employees" id="collasible-nav-dropdown">
      <Link className="p-2" to="/employees">
                  Employees
      </Link>
        <NavDropdown.Divider />
        <Link className="p-2" to="/Createemployee">
                  Add Employee
        </Link>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
  }
}

export default Layout;
