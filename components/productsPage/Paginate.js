import Link from "next/link";
import { useRouter } from "next/router";

export default function Paginate({ products }) {
  const router = useRouter();
  const { page = 1, search } = router.query;
  return (
    <div>
      <p>Page {page}</p>

      {page > 1 && (
        <Link
          href={`/products?page=${page - 1}${
            search ? `&search=${search}` : ""
          }`}
        >
          Previous Page
        </Link>
      )}

      {products.length === 12 && (
        <Link
          href={`/products?page=${parseInt(page) + 1}${
            search ? `&search=${search}` : ""
          }`}
        >
          Next Page
        </Link>
      )}
    </div>
  );
}
