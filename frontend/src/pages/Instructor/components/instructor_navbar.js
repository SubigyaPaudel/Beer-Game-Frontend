import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./instructor_navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from "../../../actions/userActions";

const Instructor_Navbar = ({ server_domain }) => {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const locallogout = () => {
    dispatch(logout());
    history.push('/');
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
            <NavDropdown.Item onClick={locallogout}>Logout</NavDropdown.Item>
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
