import "./EditProfile.css";
import { getUserById, updateUser } from "../../services/userService";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ currentUser }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser && currentUser.id) {
        const response = await getUserById(currentUser.id);
        setUserData({
          id: response.id,
          name: response.name || "",
          email: response.email || "",
        });
        localStorage.setItem("user", JSON.stringify(response));
      }
    };
    fetchUser();
  }, [currentUser.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await updateUser(userData);
    const updatedUser = await getUserById(currentUser.id);
    setUserData({
      id: updatedUser.id,
      name: updatedUser.name || "",
      email: updatedUser.email || "",
    });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate(`/profile/${currentUser.id}`);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h2 className="profile-title">Edit Profile</h2>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
