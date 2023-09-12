import Center from "@/components/Center";
import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import UserInfo from "@/components/accountPage/UserInfo";
import LastOrder from "@/components/accountPage/LastOrder";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

export default function Account({ newOrders }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [newOrders]);

  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    country: "",
    city: "",
    streetAddress: "",
    postalCode: "",
  });

  useEffect(() => {
    if (session) {
      setUserData({
        _id: session.user?.id || "",
        image: session.user?.image || "",
        name: session.user?.name || "",
        email: session.user?.email || "",
        country: session.user?.country || "",
        city: session.user?.city || "",
        streetAddress: session.user?.streetAddress || "",
        postalCode: session.user?.postalCode || "",
      });
    }
  }, [session]);

  return (
    <div>
      {loading ? null : (
        <div>
          <Header />
          <Center>
            {!!userData && (
              <ColumnsWrapper>
                <UserInfo userData={userData} setUserData={setUserData} />
                <LastOrder newOrders={newOrders} />
              </ColumnsWrapper>
            )}
          </Center>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  await mongooseConnect();
  const userId = session?.user?.id;
  const newOrders = await Order.findOne({
    userId,
    paid:true,
  })
    .select("line_items")
    .sort({ _id: -1 });
  if (!newOrders) {
    console.log("No orders were found in the database.");
    return { props: {} };
  } else {
    return {
      props: {
        newOrders: JSON.parse(JSON.stringify(newOrders)),
      },
    };
  }
}
