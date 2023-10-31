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
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import About from "@/components/About";

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
  margin: 12px;
  display: flex;
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
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(session?.user);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    country: "",
    city: "",
    streetAddress: "",
    postalCode: "",
    cartProducts,
  });
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorCheckout, setErrorCheckout] = useState("");

  useEffect(() => {
    if (session) {
      setUser(session.user);
      setUserData({
        _id: session.user?.id || "",
        name: session.user?.name || "",
        email: session.user?.email || "",
        country: session.user?.country || "",
        city: session.user?.city || "",
        streetAddress: session.user?.streetAddress || "",
        postalCode: session.user?.postalCode || "",
        cartProducts,
      });
    }
  }, [session, cartProducts]);

  useEffect(() => {
    if (cartProducts.length) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((result) => {
          setProducts(result.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setErrorCheckout(error.response.data);
          clearCart();
        });
    } else {
      setProducts([]);
      setLoading(false);
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
      if (!user) {
        setErrorCheckout("You must log in to buy");
      } else if (
        !userData.name ||
        !userData.email ||
        !userData.city ||
        !userData.postalCode ||
        !userData.streetAddress ||
        !userData.country ||
        !cartProducts
      ) {
        setErrorCheckout(
          "Fill in the parameters so we can send you your product"
        );
      } else if (user.ban) {
        setErrorCheckout("You can't buy products you are banned");
      } else {
        const response = await axios.post("/api/checkout", userData);
        if (response.data.url) {
          window.location = response.data.url;
        }
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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  if (isSuccess) {
    return (
      <About loading={loading}>
        <Header />
        <Center>
          <ColumnsWrapper>
            <WhiteBox>
              <h1>Thanks for your order!</h1>
              <p>
                Your order appears in your history when payment is completed and
                we will send you an email when your order ships.
              </p>
            </WhiteBox>
          </ColumnsWrapper>
        </Center>
      </About>
    );
  }

  return (
    <About loading={loading}>
      <Header />
      <Center>
        <ColumnsWrapper>
          {loading ? (
            <Spinner size={80} />
          ) : (
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
                    {products.map((product, index) => (
                      <tr key={index}>
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
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantitySpan>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantitySpan>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
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
          )}
          {!!cartProducts?.length && (
            <WhiteBox>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={userData.name}
                name={"name"}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Email"
                value={userData.email}
                name={"email"}
                onChange={handleInputChange}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={userData.city}
                  name={"city"}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  placeholder="Postal code"
                  value={userData.postalCode}
                  name={"postalCode"}
                  onChange={handleInputChange}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street address"
                value={userData.streetAddress}
                name={"streetAddress"}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                placeholder="Country"
                value={userData.country}
                name={"country"}
                onChange={handleInputChange}
              />
              <Button onClick={goToPayment} black={1} isblock={1}>
                Continue to payment
              </Button>
              {!!errorCheckout && <ErrorP>{errorCheckout}</ErrorP>}
            </WhiteBox>
          )}
        </ColumnsWrapper>
      </Center>
    </About>
  );
}
