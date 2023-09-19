import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paginate from "@/components/productsPage/Paginate";
import ProductsGrid from "@/components/productsPage/ProducstGrid";
import SearchProducts from "@/components/productsPage/SearchProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryFilters from "@/components/categoriesPage/CategoryFilters";

export default function CategotyPage({ categoryRelation, products }) {
  const router = useRouter();
  const { r, id, page, order, search } = router.query;

  const [newR, setNewR] = useState(r || "");
  const [properties, setProperties] = useState({});

  useEffect(() => {
    let data = "";

    if (newR && newR !== id) {
      data += `&r=${newR}`;
    }
    if (order) {
      data += `&order=${order}`;
    }
    if (search) {
      data += `&search=${search}`;
    }
    if (properties) {
      for (const key in properties) {
        const value = properties[key];
        data += `&${key}=${value}`;
      }
    }

    router.push(`/categories/${id}?page=${page ? page : 1}${data}`);
  }, [newR, properties, id, page]);

  const [categoryName, categoriesProperties] = (() => {
    let name;
    const properties = [];
    for (const category of categoryRelation) {
      if (r ? category._id === r : category._id === id) {
        name = category;
      }
      if (category._id === r || category._id === id) {
        properties.push(category);
      }
    }
    return [name, properties];
  })();

  function propertiesToFillFunc(categories) {
    let propertiesToFill = [];
    for (const category of categories) {
      category.properties.forEach((element) => {
        propertiesToFill.push(element);
      });
    }
    return propertiesToFill;
  }

 

  const propertiesToFill = propertiesToFillFunc(categoriesProperties);

  return (
    <div>
      <Header />
      <Center>
        <Title>
          {categoryName.name.charAt(0).toUpperCase() +
            categoryName.name.slice(1)}
        </Title>
        <SearchProducts category={true} />
        <CategoryFilters
          categoryRelation={categoryRelation}
          propertiesToFill={propertiesToFill}
          setNewR={setNewR}
          properties={properties}
          setProperties={setProperties}
        />
        <ProductsGrid products={products} />

        <Paginate products={products} url={`categories/${id}`} />
      </Center>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await mongooseConnect();
    const { id, r, page = 1, order, search } = context.query;
    const filter = { category: [] };

    const itemsPerPage = 12;
    const skipCount = (page - 1) * itemsPerPage;

    const categoryRelation = await Category.find({
      $or: [{ _id: id }, { parent: id }],
    });

    for (const category of categoryRelation) {
      if (r) {
        if (category._id == r || category.parent == r) {
          filter.category.push(category._id);
        }
      } else {
        filter.category.push(category._id);
      }
    }

    for (const prop in context.query) {
      if (
        prop !== "id" &&
        prop !== "r" &&
        prop !== "search" &&
        prop !== "order" &&
        prop !== "page"
      ) {
        filter[`properties.${prop}`] = context.query[prop];
      }
    }

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

    if (search) {
      filter.title = {
        $regex: new RegExp(search, "i"),
      };
    }

    const products = await Product.find(filter)
      .sort(orderOptions)
      .skip(skipCount)
      .limit(itemsPerPage);

    return {
      props: {
        categoryRelation: JSON.parse(JSON.stringify(categoryRelation)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.error("Error en getServerSideProps:", error);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}
