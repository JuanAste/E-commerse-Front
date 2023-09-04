import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const ContentOrder = styled.div`
  margin-left: 200px;
  margin-bottom:20px;
`;

const ContentSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const InputSearch = styled.input`
  width: 300px;
  height: 30px;
`;
const SearchButton = styled(Link)`
  color: #222;
  border: 1px solid #222;
  border-radius: 5px;
  padding: 8px;
  text-decoration: none;
  &:hover {
    background-color: #222;
    color: white;
  }
`;

const SelectOrder = styled.select`
  padding: 10px;
  width: 200px;
  border-radius: 5px;
`;

export default function SearchProducts() {
  const router = useRouter();
  const { order } = router.query;

  const [orderProd, setOrderProd] = useState(order || "");
  const [searchInp, setSearchInp] = useState("");

  useEffect(() => {
    if (orderProd) {
      handleSearch();
    }
  }, [orderProd]);

  const url = `/products?page=1${searchInp ? `&search=${searchInp}` : ""}${
    orderProd ? `&order=${orderProd}` : ""
  }`;

  const handleSearch = () => {
    router.push(url);
  };

  return (
    <Content>
      <ContentSearch>
        <InputSearch
          type="text"
          value={searchInp}
          onChange={(ev) => setSearchInp(ev.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              handleSearch(ev.target.value);
            }
          }}
        />
        <SearchButton href={url}>Search</SearchButton>
      </ContentSearch>

      <ContentOrder>
        <label>Order</label>
        <SelectOrder
          value={orderProd}
          onChange={(ev) => setOrderProd(ev.target.value)}
        >
          <option value={"newProducts"}>New products</option>
          <option value={"oldProducts"}>Old products</option>
          <option value={"priceUp"}>Price up</option>
          <option value={"priceDown"}>Price down</option>
        </SelectOrder>
      </ContentOrder>
    </Content>
  );
}
