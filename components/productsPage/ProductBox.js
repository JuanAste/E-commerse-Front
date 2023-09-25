import styled from "styled-components";
import Button from "../Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import imageErr404 from "../../Images/error 404.png";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  text-decoration: none;
  color: inherit;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

const ContentScore = styled.div`
  font-size: 1.4rem;
`;

export default function ProductBox({ _id, title, price, images, score }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0] || imageErr404.src} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        {score ? (
          <ContentScore>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  color: star <= score ? "gold" : "lightgray",
                }}
              >
                &#9733;
              </span>
            ))}
          </ContentScore>
        ) : null}
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            isblock={1}
            isprimary={1}
            isoutline={1}
            hoverprimary={1}
            onClick={() => addProduct(_id)}
          >
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
