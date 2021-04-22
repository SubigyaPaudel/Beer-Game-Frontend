import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./player_navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Player_Navbar = () => {
  const history = useHistory();
  const {url, path} = useRouteMatch();
  const logout = () => {
    console.log("Logging out");
    history.push("/");
  };
  return (
    <Navbar bg="dark" expand="sm" fixed="top" id="navbar">
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
          <NavDropdown
            title="Options"
            id="basic-nav-dropdown"
            style={{ backgroundColor: "gray", marginRight: "5px" }}
          >
            <NavDropdown.Item>Suggestions</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Player_Navbar;
