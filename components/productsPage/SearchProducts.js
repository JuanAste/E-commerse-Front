import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";


const Content = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding:20px;
    margin-bottom:20px;
`;

const ContentOrder = styled.div`
    margin-left: 300px;
`;

const ContentSearch = styled.div`
   display:flex;
   align-items:center;
`
const InputSearch = styled.input`
   width:300px;
   height:30px;
`


export default function SearchProducts() {
  const [order, setOrder] = useState("");
  const [searchInp, setSearchInp] = useState("");

  const router = useRouter();
  const { page = 1, search } = router.query;

  useEffect(() => {
    if (order) {
        handleSearch();
      }
  }, [order]);

  const url = `/products?page=1${searchInp ? `&search=${searchInp}` : ""}${
    order ? `&order=${order}` : ""
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
        <Link href={url}>search</Link>
      </ContentSearch>

      <ContentOrder>
        <select onChange={(ev) => setOrder(ev.target.value)}>
          <option value={"newProducts"}>New products</option>
          <option value={"oldProducts"}>Old products</option>
          <option value={"priceUp"}>Price up</option>
          <option value={"priceDown"}>Price down</option>
        </select>
      </ContentOrder>
    </Content>
  );
}
