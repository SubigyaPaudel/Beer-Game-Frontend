import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./instructor_navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";


const Instructor_Navbar = ({ server_domain }) => {
  const {url, path} = useRouteMatch();
  const history = useHistory();
  const logout = () => {
    console.log("Logging out");
    history.push("/sign_out");
  };
  return (
    <Navbar bg="light" href="/instructor" expand="lg" fixed="top" id="navbar">
      <Navbar.Brand
        className="side_shift"
        href={`${path}`}
        style={{ position: "relative", left: "2%" }}
      >
        <h1 style={{ color: "gold" }}>The Beer Game</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="options">
        <Nav className="mr-auto">
          <NavDropdown title="Options" id="basic-nav-dropdown">
            <NavDropdown.Item>Suggestions</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Instructor_Navbar;