import styled from "styled-components";
import Table from "../Table";
import imageErr404 from "../../Images/error 404.png";
import Button from "../Button";
import { useState } from "react";

const Total = styled.td`
  font-size: 1.3rem;
  font-weight: 500;
  div {
    text-align: start;
    margin-top: 20px;
  }
`;

const Price = styled.td`
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
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

const StyledTable = styled.table`
  width: 100%;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  th {
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid white;
    text-align: center;
  }
  tr {
    color: white;
  }
`;

const TdStart = styled.td`
  div {
    text-align: start;
  }
`;

export default function TableRecord({ orders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2; // Número de órdenes por página

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  let total = 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {currentOrders.slice().map((order) => (
        <div key={order._id}>
          <h3>
            Order date: {new Date(order.createdAt).toLocaleDateString("es-ES")}
          </h3>
          <StyledTable>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.line_items?.map((product) => {
                total += product.price_data.unit_amount;
                return (
                  <tr key={product._id}>
                    <TdStart>
                      <div>
                        <ProductImageBox>
                          <img
                            src={
                              product.price_data.product_data.images[0] ||
                              imageErr404.src
                            }
                            alt=""
                          />
                        </ProductImageBox>
                        {product.price_data.product_data.name}
                      </div>
                    </TdStart>
                    <td>{product.quantity}</td>
                    <td>${product.price_data.unit_amount / 100}</td>
                  </tr>
                );
              })}
              <tr>
                <Total>
                  <div>Total:</div>
                </Total>
                <td></td>
                <Price>${total / 100}</Price>
              </tr>
            </tbody>
          </StyledTable>
        </div>
      ))}
      <div>
        {orders.length > ordersPerPage && (
          <div>
            <Button onClick={() => paginate(currentPage - 1)}>Previous</Button>
            <Button onClick={() => paginate(currentPage + 1)}>Next</Button>
          </div>
        )}
      </div>
    </div>
  );
}
