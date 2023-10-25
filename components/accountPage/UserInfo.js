import styled from "styled-components";
import Button from "../Button";
import { useState } from "react";
import imageErr404 from "../../Images/error 404.png";
import axios from "axios";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const StyleUserInfoForm = styled.form`
  background-color: #222;
  color: white;
  padding: 40px;
  border-radius: 6px;
  input {
    padding: 10px;
    min-height: 15px;
    width: 94%;
    background-color: white;
    color: black;
    border-radius: 5px;
  }
`;

const ContentImage = styled.div`
  display: flex;
  justify-content: center;
`;

const UserImage = styled.img`
  height: 100%;
  width: 40%;
  border-radius: 50%;
`;

const ContentButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ButtonsForm = styled.div`
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
`;


export default function UserInfo({ userData, setUserData }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  async function UpdateUser(ev) {
    ev.preventDefault();
    await axios.put("/api/user", userData);
    setEdit(false);
  }

  async function logOut() {
    await router.push("/");
    await signOut();
  }

  return (
    <div>
      <StyleUserInfoForm>
        <ContentImage>
          <UserImage src={userData.image || imageErr404.src} alt="" />
        </ContentImage>
        <h3>Name:</h3>
        <input
          value={userData.name}
          name={"name"}
          onChange={handleInputChange}
          disabled={!edit}
        />
        <h3>Email:</h3>
        <input
          value={userData.email}
          name={"email"}
          onChange={handleInputChange}
          disabled={!edit}
        />
        <h3>country:</h3>
        {
          <input
            value={userData.country}
            name={"country"}
            onChange={handleInputChange}
            disabled={!edit}
          />
        }
        <h3>city:</h3>
        <input
          value={userData.city}
          name={"city"}
          onChange={handleInputChange}
          disabled={!edit}
        />
        <h3>Street address:</h3>
        <input
          value={userData.streetAddress}
          name={"streetAddress"}
          onChange={handleInputChange}
          disabled={!edit}
        />
        <h3>postalCode:</h3>
        <input
          value={userData.postalCode}
          name={"postalCode"}
          onChange={handleInputChange}
          disabled={!edit}
        />
        <ContentButton>
          {edit ? (
            <ButtonsForm>
              <Button hoverGreen={1} onClick={UpdateUser}>
                Save
              </Button>
              <Button
                hoverRed={1}
                red={1}
                type="button"
                onClick={() => setEdit(false)}
              >
                Cancel
              </Button>
            </ButtonsForm>
          ) : (
            <>
              <Button hoverprimary={1} onClick={() => setEdit(true)}>
                Edit
              </Button>
              <Button hoverRed={1} red={1} onClick={logOut}>
                Logout
              </Button>
            </>
          )}
        </ContentButton>
      </StyleUserInfoForm>
    </div>
  );
}
