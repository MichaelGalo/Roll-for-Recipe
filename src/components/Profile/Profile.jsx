import { useParams } from "react-router-dom";
import "./Profile.css";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { EditProfileButton } from "../Buttons/EditProfileButton";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data and update state
        const response = await getUserById(currentUser.id);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    // Only fetch user if currentUser.id is available and user data isn't already loaded
    if (currentUser?.id && (!user || user.id !== currentUser.id)) {
      fetchUser();
    } else {
      // If user data is already loaded, use it from localStorage
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [currentUser.id]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="profile-title">Profile</h2>
            </Card.Header>
            <Card.Body>
              {user ? (
                <>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </>
              ) : (
                <p>Loading...</p>
              )}
              <EditProfileButton currentUser={currentUser} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
