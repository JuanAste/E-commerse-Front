import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const NotProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProductsGrid({ products }) {
  return (
    <div>
      {products.length ? (
        <StyledProductsGrid>
          {products.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))}
        </StyledProductsGrid>
      ) : (
        <NotProductsContainer>
          <h2>There are no more products available at this time.</h2>
        </NotProductsContainer>
      )}
    </div>
  );
}
