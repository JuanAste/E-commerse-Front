import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartIcon from "@/components/Icons/Cart";
import ProductImages from "@/components/productsPage/ProductImages";
import Reviews from "@/components/Review/Reviews";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ContentScore = styled.div`
  font-size: 2rem;
`;

export default function ProductPage({ product, order, review, reviews }) {
  const { addProduct } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [product]);

  return (
    <>
      {loading ? null : (
        <>
          <Header />
          <Center>
            {!!product && (
              <ColWrapper>
                <WhiteBox>
                  <ProductImages images={product.images} />
                </WhiteBox>
                <div>
                  <Title>{product.title}</Title>
                  <ContentScore>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          color: star <= product.score ? "gold" : "lightgray",
                        }}
                      >
                        &#9733;
                      </span>
                    ))}
                  </ContentScore>
                  <p>{product.description}</p>
                  <PriceRow>
                    <div>
                      <Title>${product.price}</Title>
                    </div>
                    <div>
                      <Button
                        isprimary={1}
                        hoverOutline={1}
                        onClick={() => addProduct(product._id)}
                      >
                        <CartIcon /> Add to cart
                      </Button>
                    </div>
                  </PriceRow>
                </div>
              </ColWrapper>
            )}
            <Reviews order={order} review={review} reviews={reviews} />
          </Center>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const session = await getSession(context);
  const userId = session?.user?.id;
  const { id } = context.query;

  try {
    const product = await Product.findById(id);

    const order = await Order.findOne({
      userId,
      paid: true,
      "line_items.product_id": id,
    });

    const review = await Review.findOne({
      userId,
      ProductId: id,
    });

    const reviews = await Review.find({ ProductId: id }).sort({ createdAt: 1 });

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        order: JSON.parse(JSON.stringify(order)),
        review: JSON.parse(JSON.stringify(review)),
        reviews: JSON.parse(JSON.stringify(reviews)),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        product: null,
        order: null,
        review: null,
        reviews: null,
      },
    };
  }
}
