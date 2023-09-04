import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  margin-top: 40px;
`;

const PageLink = styled(Link)`
  color: #222;
  border: 1px solid #222;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  min-width: 120px;
  align-items: center;
  justify-content: center;
  padding:4px;
  &:hover {
    background-color: #222;
    color: white;
  }
`;

const PageButton = styled.button`
  color: #222;
  border: 1px solid #222;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  min-width: 120px;
  align-items: center;
  justify-content: center;
  padding:4px;
  font-size: 1rem;
  &:hover {
    background-color: #222;
    color: white;
  }
`;

const PageNum = styled.p`
  font-size: 1.2rem;
`;

export default function Paginate({ products }) {
  const router = useRouter();
  const { page = 1, search } = router.query;
  return (
    <Content>
      {page > 1 ? (
        <PageLink
          href={`/products?page=${page - 1}${
            search ? `&search=${search}` : ""
          }`}
        >
          Previous Page
        </PageLink>
      ) : (
        <PageButton>Previous Page</PageButton>
      )}

      <PageNum>{page}</PageNum>

      {products.length >= 12 ? (
        <PageLink
          href={`/products?page=${parseInt(page) + 1}${
            search ? `&search=${search}` : ""
          }`}
        >
          Next Page
        </PageLink>
      ) : (
        <PageButton>Next Page</PageButton>
      )}
    </Content>
  );
}
