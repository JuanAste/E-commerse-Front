import Link from "next/link";
import styled from "styled-components";

const ContentLinkRecord = styled(Link)`
  color: white;
  text-decoration: none;
  border-radius: 3px;
  padding: 20px;
  background-color: #222;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 200px;
  img {
    height: 100px;
    width: auto;
  }
  &:hover {
    color: #222;
    background-color: grey;
  }
`;

const LinkRedordPage = styled(Link)`
  width: 97%;
  color: white;
  text-decoration: none;
  background-color: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
  margin-top: 20px;
  border-radius: 3px;
  &:hover {
    color: #222;
    background-color: grey;
  }
`;

export default function LastOrder({ newOrders }) {
  return (
    <div>
      <h2>Last order</h2>
      {newOrders.line_items.slice(0, 2).map((order, index) => (
        <ContentLinkRecord key={index} href={"/product/" + order?.product_id}>
          <img src={order?.price_data?.product_data?.images[0]} alt="" />
          <h2>{order?.price_data?.product_data?.name}</h2>
          <h2>$ {order?.price_data?.unit_amount / 100}</h2>
        </ContentLinkRecord>
      ))}
      <LinkRedordPage href={"/account/record"}>Record</LinkRedordPage>
    </div>
  );
}
