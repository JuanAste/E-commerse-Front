import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 380px;
  height: 200px;
  background-color: #222;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    width: 320px;
    height: 120px;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const CategoryName = styled.h1`
  background-color: black;
  padding-left:8px;
  padding-right:8px;
  border-radius:5px;  
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: auto;
  text-align: center;
  color: white;
  position:absolute;
  @media screen and (max-width: 768px) {
    top: 60%;
  }
`;

const LinkContains = styled(Link)`
  text-decoration: none;
`;

export default function CategoriesSelect({ categories }) {
  return (
    <Container>
      {categories?.map((category, index) => (
        <LinkContains key={index} href={`/categories/${category._id}?page=1`}>
          <CategoryContainer>
            {category.image && <CategoryImage src={category.image} />}
            <CategoryName>{category.name}</CategoryName>
          </CategoryContainer>
        </LinkContains>
      ))}
    </Container>
  );
}
