import Center from "@/components/Center";
import Header from "@/components/Header";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import imageErr404 from "../Images/error 404.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/Button";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const StyleUserInfo = styled.header`
  background-color: #222;
  color: white;
  padding: 40px;
  border-radius: 6px;
  h4 {
    background-color: white;
    color: #222;
    padding: 10px;
    min-height: 15px;
    width: 350px;
  }
  input {
    padding: 10px;
    min-height: 15px;
    width: 350px;
  }
`;
const StyleUserInfoForm = styled.form`
  background-color: #222;
  color: white;
  padding: 40px;
  border-radius: 6px;
  input {
    padding: 10px;
    min-height: 15px;
    width: 350px;
  }
`;

const ContentImage = styled.div`
  display: flex;
  justify-content: center;
`;

const UserImage = styled.img`
  height: 100%;
  width: 40%;
  border-radius: 50%;
`;

const ContentButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ButtonsForm = styled.div`
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
`;

export default function Account({ newOrders }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState(session?.user);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    country: "",
    city: "",
    streetAddress: "",
    postalCode: "",
  });

  console.log(newOrders);

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
      });
    }
  }, [session]);

  async function logOut() {
    await router.push("/");
    await signOut();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  async function UpdateUser() {
    await axios.put("/api/user", userData);
    setEdit(false);
  }

  function renderOrderItems(order) {
    return (
      <div key={order?.product_id}>
        <img src={order?.price_data?.product_data?.images[0]} alt="" />
        <h2>{order?.product_id}</h2>
        <h2>{order?.price_data?.product_data?.name}</h2>
        <h2>$ {order?.price_data?.unit_amount / 100}</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Center>
        {!!user && (
          <ColumnsWrapper>
            {edit ? (
              <StyleUserInfoForm>
                <ContentImage>
                  <UserImage src={user.image || imageErr404.src} alt="" />
                </ContentImage>
                <h3>Name:</h3>
                <input
                  value={userData.name}
                  name={"name"}
                  onChange={handleInputChange}
                />
                <h3>Email:</h3>
                <input
                  value={userData.email}
                  name={"email"}
                  onChange={handleInputChange}
                />
                <h3>country:</h3>
                {
                  <input
                    value={userData.country}
                    name={"country"}
                    onChange={handleInputChange}
                  />
                }
                <h3>city:</h3>
                <input
                  value={userData.city}
                  name={"city"}
                  onChange={handleInputChange}
                />
                <h3>Street address:</h3>
                <input
                  value={userData.streetAddress}
                  name={"streetAddress"}
                  onChange={handleInputChange}
                />
                <h3>postalCode:</h3>
                <input
                  value={userData.postalCode}
                  name={"postalCode"}
                  onChange={handleInputChange}
                />
                <ContentButton>
                  <ButtonsForm>
                    <Button onClick={UpdateUser}>Save</Button>
                    <Button type="button" onClick={() => setEdit(false)}>
                      Cansel
                    </Button>
                  </ButtonsForm>
                  <Button type="button" onClick={logOut}>
                    logout
                  </Button>
                </ContentButton>
              </StyleUserInfoForm>
            ) : (
              <StyleUserInfo>
                <ContentImage>
                  <UserImage src={user.image || imageErr404.src} alt="" />
                </ContentImage>
                <h3>Name:</h3>
                <h4>{user.name}</h4>
                <h3>Email:</h3>
                <h4>{user.email}</h4>
                <h3>Country:</h3>
                <h4>{user.country}</h4>
                <h3>City:</h3>
                <h4>{user.city}</h4>
                <h3>Street address:</h3>
                <h4>{user.streetAddress}</h4>
                <h3>Postal code:</h3>
                <h4>{user.postalCode}</h4>
                <ContentButton>
                  <Button onClick={() => setEdit(true)}>Edit</Button>
                  <Button onClick={logOut}>logout</Button>
                </ContentButton>
              </StyleUserInfo>
            )}
            <div>
              <h2>Últimas compras</h2>
              {newOrders[0].line_items.slice(0, 2).map((order, index) => (
                <div key={index}>
                  <img
                    src={order?.price_data?.product_data?.images[0]}
                    alt=""
                  />
                  <h2>{order?.product_id}</h2>
                  <h2>{order?.price_data?.product_data?.name}</h2>
                  <h2>$ {order?.price_data?.unit_amount / 100}</h2>
                </div>
              ))}
            </div>
          </ColumnsWrapper>
        )}
      </Center>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  await mongooseConnect();
  const record = session?.user?.record;
  const newOrders = await Order.find({
    _id: { $in: record },
    "line_items.product_id": { $exists: true },
  })
    .select("line_items")
    .sort({ _id: -1 })
    .limit(1);
  if (!newOrders) {
    console.log("No orders were found in the database.");
  } else {
    return {
      props: {
        newOrders: JSON.parse(JSON.stringify(newOrders)),
      },
    };
  }
}
