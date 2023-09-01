import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./productsPage/ProducstGrid";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
