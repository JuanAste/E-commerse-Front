/* eslint-disable @next/next/no-img-element */
import styled, { css } from "styled-components";
import Link from "next/link";
import Button from "./Button";

const Container = styled.div`
  background-color: #222;
  height: 13rem;
  margin-top: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  ${(props) =>
    props.isloading === "true" &&
    css`
      display: none;
    `}
`;

const ContainChild = styled.div`
min-height:45rem;
`

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 0.7fr;
  gap: 30px;
  margin: 0rem 3rem;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 300px) {
    grid-template-columns: 1fr;
  }
`;
const Social = styled.div`
  gap: 2rem;
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const NotColm = styled.div`
  p {
    font-size: 11px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const NotColm2 = styled.div`
  text-align: center;
  @media screen and (max-width: 350px) {
    display: none;
  }
`;

const Contact = styled.div`
  text-align: center;
`;

export default function About({ children, loading }) {
  return (
    <div>
      <ContainChild>
      {children}
      </ContainChild>
      {loading ? null : (
        <Container isloading={loading ? "true" : "false"}>
          <ColumnsWrapper>
            <NotColm>
              <h2>About us:</h2>
              <p>
                At the heart of our company beats an unwavering passion for
                technology. We are dedicated to putting the most innovative and
                powerful devices on the market in your hands, from smartphones
                to powerful computers. Our goal is to make technology accessible
                and exciting for everyone, providing you not only with
                exceptional products but also with knowledge and support so you
                can make the most of every device.
              </p>
            </NotColm>
            <NotColm2>
              <h2>social networks:</h2>
              <Social>
                <a href="https://www.linkedin.com/in/juan-aste-41a2ba266/">
                  <img
                    src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
                    alt="LinkedIn"
                  />
                </a>
              </Social>
              <Social>
                <a href="https://github.com/JuanAste">
                  <img
                    src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                    alt="GitHub"
                  />
                </a>
                <a href="mailto:juanpabloaste00@gmail.com">
                  <img
                    src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"
                    alt="Gmail"
                  />
                </a>
              </Social>
            </NotColm2>
            <Contact>
              <h2>Contact us:</h2>
              <Link href={"/contact"}>
                <Button>Contact</Button>
              </Link>
            </Contact>
          </ColumnsWrapper>
        </Container>
      )}
    </div>
  );
}
