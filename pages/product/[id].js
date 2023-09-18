import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import CartIcon from "@/components/Icons/Cart";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getSession } from "next-auth/react";
import { useContext } from "react";
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

export default function ProductPage({ product, order }) {
  const { addProduct } = useContext(CartContext);

  console.log(order);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Title>${product.price}</Title>
              </div>
              <div>
                <Button
                  primary={1}
                  hoverOutline={1}
                  onClick={() => addProduct(product._id)}
                >
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const session = await getSession(context);
  const userId = session?.user?.id;
  const { id } = context.query;


  try {
    const order = await Order.findOne({
      userId: userId,
      "line_items.product_id": "64c01baae5961e9ac734cbd4",
    });


    const product = await Product.findById(id);
    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        order: JSON.parse(JSON.stringify(order)),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        product: null,
        order: null,
      },
    };
  }
}
