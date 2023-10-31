import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getSession } from "next-auth/react";
import TableRecord from "@/components/RecordPage/TableRecord";
import { useEffect, useState } from "react";
import About from "@/components/About";

export default function RecordPage({ orders }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [orders]);

  return (
    <About loading={loading}>
      {loading ? null : (
        <div>
          <Header />
          <Center>
            <div>
              <h2>Orders</h2>
              {orders.length ? (
                <TableRecord orders={orders} />
              ) : (
                <h3>Ops it seems that you have not purchased any product...</h3>
              )}
            </div>
          </Center>
        </div>
      )}
    </About>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  await mongooseConnect();
  const userId = session?.user?.id;
  const orders = await Order.find({
    userId,
    paid: true,
  })
    .select("line_items createdAt delivered paid")
    .sort({ createdAt: -1 });

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
