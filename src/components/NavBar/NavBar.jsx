import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { handleLogout } from "../auth/authFunctions";
import "./NavBar.css";

export const NavBar = ({ currentUser }) => {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to="/roll-for-recipe">
            Roll for Recipe!
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/new-recipe">
              New Recipe
            </Nav.Link>
            <Nav.Link as={Link} to="/all-recipes">
              All Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/my-recipes">
              My Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
            {currentUser && currentUser.id && (
              <Nav.Link as={Link} to={`/profile/${currentUser.id}`}>
                Profile
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/shopping-list">
              Shopping List
            </Nav.Link>
            <Nav.Link
              className="logout"
              as={Link}
              to="/login"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
