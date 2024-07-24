import { useParams } from "react-router-dom";
import "./Profile.css";
import { getUserById } from "../../services/userService";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserById(currentUser.id);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
    };

    if (!user.id || user.id !== currentUser.id) {
      fetchUser();
    }
  }, [currentUser.id, user.id]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="profile-title">Profile</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
