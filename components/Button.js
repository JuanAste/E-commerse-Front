import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.isblock &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.isoutline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.isoutline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
    ${(props) =>
    props.black &&
    !props.isoutline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.isoutline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${(props) =>
    props.isprimary &&
    !props.isoutline &&
    css`
      background-color: #0d3d29;
      border: 1px solid #0d3d29;
      color: #fff;
    `}
    ${(props) =>
    props.isprimary &&
    props.isoutline &&
    css`
      background-color: transparent;
      border: 1px solid #0d3d29;
      color: #0d3d29;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
        ${(props) =>
    props.red &&
    css`
      background-color: red;
      border: 1px solid #0d3d29;
      color: white;
    `}
    ${(props) =>
    props.hoverprimary &&
    css`
      &:hover {
        background-color: #0d3d29;
        border: 1px solid #0d3d29;
        color: #fff;
      }
    `}
    ${(props) =>
    props.hoveroutline &&
    css`
      &:hover {
        background-color: transparent;
        border: 1px solid #0d3d29;
        color: #0d3d29;
      }
    `}
    ${(props) =>
    props.hoverred &&
    css`
      &:hover {
        background-color: white;
        border: 1px solid transparent;
        color: red;
      }
    `}
    ${(props) =>
    props.hovergreen &&
    css`
      &:hover {
        background-color: #0d3d29;
        color: #fff;
      }
    `}
    ${(props) =>
    props.blue &&
    css`
      background-color: #007FFF;
      border: 1px solid #007FFF;
      color: white;
      &:hover {
        background-color: white;
        color: #007FFF;
      }
    `}
    ${(props) =>
    props.greensave &&
    css`
      background-color: #17B169;
      border: 1px solid #17B169;
      color: white;
      &:hover {
        background-color: white;
        color: #17B169;
      }
    `}
    
`;

const StyledButton = styled.button`
  ${ButtonStyle};
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
