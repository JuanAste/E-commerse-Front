import Link from "next/link";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "./Icons/Bars";
import { signIn, useSession } from "next-auth/react";

const StyleHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  z-index: 5;

  ${(props) =>
    props.mobilenavactive ? `position:fixed; margin-top:35px;` : ""}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  margin: 0rem 3rem;
  padding-bottom: 2rem;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobilenavactive ? `display:block;` : `display:none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  z-index: 4;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  position: block;
  background-color: transparent;
  padding: 10px 0;
  font-size: 17px;
  border: 0;
  color: #aaa;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButtonIcon = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  ${(props) => (props.mobilenavactive ? ` position: fixed; right: 50px;` : "")}
  z-index: 5;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [cartProducts]);

  return (
    <StyleHeader>
      {loading ? null : (
        // <Center>
        <Wrapper>
          <LogoWrapper>
            <Logo href={"/"} mobilenavactive={mobileNavActive ? 1 : 0}>
              Ecommerce
            </Logo>
          </LogoWrapper>
          <StyledNav mobilenavactive={mobileNavActive ? 1 : 0}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products?page=1"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            {!session ? (
              <NavButton onClick={() => signIn("google")}>Account</NavButton>
            ) : (
              <NavLink href={"/account"}>Account</NavLink>
            )}

            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButtonIcon
            mobilenavactive={mobileNavActive ? 1 : 0}
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            <BarsIcon />
          </NavButtonIcon>
        </Wrapper>
        // </Center>
      )}
    </StyleHeader>
  );
}
