import About from "@/components/About";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Paginate from "@/components/productsPage/Paginate";
import ProductsGrid from "@/components/productsPage/ProducstGrid";
import SearchProducts from "@/components/productsPage/SearchProducts";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

export default function ProductsPage({ products }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  return (
    <About loading={loading}>
      {loading ? (
        <Spinner size={80} />
      ) : (
        <div>
          <Header />
          <Center>
            <Title>All products</Title>
            <SearchProducts />
            <ProductsGrid products={products} />
            <Paginate products={products} url={"products"} />
          </Center>
        </div>
      )}
    </About>
  );
}

export async function getServerSideProps({ query }) {
  const { page = 1, search, order } = query;
  await mongooseConnect();

  //page
  const itemsPerPage = 12;
  const skipCount = (page - 1) * itemsPerPage;

  //order
  const mapOrderValue = (selectedValue) => {
    switch (selectedValue) {
      case "newProducts":
        return { createdAt: -1 };
      case "oldProducts":
        return { createdAt: 1 };
      case "priceUp":
        return { price: 1 };
      case "priceDown":
        return { price: -1 };
      default:
        return { _id: -1 };
    }
  };

  const orderOptions = mapOrderValue(order);
  const products = await Product.find(
    { enabled: true, title: { $regex: new RegExp(search, "i") } },
    null,
    {
      sort: orderOptions,
    }
  )
    .skip(skipCount)
    .limit(itemsPerPage);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
