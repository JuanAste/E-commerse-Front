import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

export default function ContactUs() {
  const form = useRef();
  const [res, setRes] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    if (!name || !email || !message) {
      setRes("Please complete all fields.");
      return;
    }

    emailjs
      .sendForm(
        process.env.SERVICE_EMAIL_ID,
        process.env.TEMPLATE_EMAIL_ID,
        form.current,
        process.env.PUBLIC_KEY_EMAIL
      )
      .then(
        (result) => {
          setRes("message sent");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.log(error.text);
          setRes(error.text);
        }
      );
  };

  return (
    <Container>
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
          {!!res && <p>{res}</p>}
        </form>
      </StyledContactForm>
    </Container>
  );
}

// Styles

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContactForm = styled.div`
  width: 450px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    p {
      color: blue;
    }

    input[type="submit"] {
      margin-top: 1.5rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
