import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paginate from "@/components/productsPage/Paginate";
import ProductsGrid from "@/components/productsPage/ProducstGrid";
import SearchProducts from "@/components/SearchProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useRouter } from "next/router";

export default function CategotyPage({ categoryRelation, products, category }) {
//   console.log(categoryRelation);
//   console.log(products);

  const router = useRouter();
  const { r, id } = router.query;

  function handleChange(ev) {
    const selectedValue = ev.target.value;
    router.push(
      `/categories/${id}${selectedValue !== id ? `?r=${selectedValue}` : ""}`
    );
  }

  return (
    <div>
      <Header />
      <Center>
        <Title>
          {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        </Title>
        <SearchProducts category={true} />
        <select value={r ? r : id} onChange={handleChange}>
          {categoryRelation?.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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

    const category = await Category.findById(id);

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
        // console.log(`La clave es ${prop} y el valor es ${context.query[prop]}`);
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

    // console.log(filter);

    // console.log(context.query);

    const products = await Product.find(filter)
      .sort(orderOptions)
      .skip(skipCount)
      .limit(itemsPerPage);

    return {
      props: {
        category: JSON.parse(JSON.stringify(category)),
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
