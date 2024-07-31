import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const EditProfileButton = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile/" + currentUser.id);
  };

  return (
    <Button
      variant="secondary"
      className="edit-profile-button"
      onClick={handleEditProfile}
    >
      Edit Profile
    </Button>
  );
};
