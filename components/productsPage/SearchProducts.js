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
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentOrder = styled.div`
  margin-left: 200px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-top: 30px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
  }
`;

const ContentSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  @media screen and (max-width: 768px) {
    gap: 5px;
  }
`;
const InputSearch = styled.input`
  width: 300px;
  height: 30px;
  @media screen and (max-width: 768px) {
    width: 200px;
    margin-left: 20px;
  }
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

export default function SearchProducts({ category }) {
  const router = useRouter();
  const { order, id, search } = router.query;

  const [orderProd, setOrderProd] = useState(order || "");
  const [searchInp, setSearchInp] = useState(search || "");
  const [clearSearch, setClearSearch] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [orderProd, clearSearch]);

  let url = `/products?page=1${searchInp ? `&search=${searchInp}` : ""}${
    orderProd ? `&order=${orderProd}` : ""
  }`;

  if (category) {
    url = `/categories/${id}?page=1${searchInp ? `&search=${searchInp}` : ""}${
      orderProd ? `&order=${orderProd}` : ""
    }`;
  }

  for (const prop in router.query) {
    if (
      prop !== "page" &&
      prop !== "id" &&
      prop !== "search" &&
      prop !== "order"
    ) {
      url += `&${prop}=${router.query[prop]}`;
    }
  }

  const handleSearch = () => {
    router.push(url);
  };

  return (
    <Content>
      <ContentSearch>
        <InputSearch
          type="text"
          value={searchInp}
          onChange={(ev) => {
            setSearchInp(ev.target.value);
            if (ev.target.value === "") {
              setClearSearch(!clearSearch);
            }
          }}
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
          <optgroup label="Products">
            <option value={"newProducts"}>New products</option>
            <option value={"oldProducts"}>Old products</option>
          </optgroup>
          <optgroup label="Price">
            <option value={"priceUp"}>Price up</option>
            <option value={"priceDown"}>Price down</option>
          </optgroup>
        </SelectOrder>
      </ContentOrder>
    </Content>
  );
}
