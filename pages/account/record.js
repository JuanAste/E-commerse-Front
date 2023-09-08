import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";
import TableRecord from "@/components/RecordPage/TableRecord";
import { useEffect, useState } from "react";

export default function RecordPage({ ordersDelivered, ordersUndelivered }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [ordersDelivered, ordersUndelivered]);

  return (
    <div>
      {loading ? null : (
        <div>
          <Header />
          <Center>
            <div>
              <h2>Delivered</h2>
              {ordersDelivered.length ? (
                <TableRecord orders={ordersDelivered} />
              ) : (
                <h3>
                  Ops it seems that they have not delivered any product...
                </h3>
              )}
            </div>
            <div>
              <h2>Undelivered</h2>
              {ordersUndelivered.length ? (
                <TableRecord orders={ordersUndelivered} />
              ) : (
                <h3>
                  Ops it seems that they have already delivered all your
                  orders...
                </h3>
              )}
            </div>
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
  const ordersDelivered = await Order.find({
    userId,
    delivered: true,
  })
    .select("line_items createdAt")
    .sort({ createdAt: -1 });
  const ordersUndelivered = await Order.find({
    userId,
    $or: [{ delivered: false }, { delivered: { $exists: false } }],
  })
    .select("line_items createdAt")
    .sort({ createdAt: -1 });

  return {
    props: {
      ordersDelivered: JSON.parse(JSON.stringify(ordersDelivered)),
      ordersUndelivered: JSON.parse(JSON.stringify(ordersUndelivered)),
    },
  };
}
