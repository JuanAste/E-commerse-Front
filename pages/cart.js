import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import imageErr404 from "../Images/error 404.png";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.7fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantitySpan = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Total = styled.td`
  margin-top: 10px;
  font-size: 1.3rem;
  font-weight: 500;
`;

const ErrorP = styled.p`
  margin-top: 10px;
  color: red;
  font-size: 0.8rem;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorCheckout, setErrorCheckout] = useState("");

  useEffect(() => {
    if (cartProducts.length) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((result) => {
          setProducts(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    try {
      const response = await axios.post("/api/checkout", {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      setErrorCheckout(error.response.data);
      console.log(error.response.data);
    }
  }

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </WhiteBox>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <WhiteBox>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {!!products?.length && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._Id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.images[0] || imageErr404.src}
                            alt=""
                          />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantitySpan>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantitySpan>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <Total>Total:</Total>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </WhiteBox>
          {!!cartProducts?.length && (
            <WhiteBox>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal code"
                  value={postalCode}
                  name={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street address"
                value={streetAddress}
                name={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button onClick={goToPayment} black={1} block={1}>
                Continue to payment
              </Button>
              {!!errorCheckout && <ErrorP>{errorCheckout}</ErrorP>}
            </WhiteBox>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
