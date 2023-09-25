import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import CategoriesSelect from "@/components/categoriesPage/CategoriesSelect";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";

export default function CategoryPage({ categories }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [categories]);

  return (
    <>
      {loading ? null : (
        <div>
          <Header />
          <Center>
            <Title>Categories</Title>
            <CategoriesSelect categories={categories} />
          </Center>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({ parent: { $exists: false } }).sort({
    createdAt: -1,
  });
  if (!categories) {
    console.log("No categories were found in the database.");
  } else {
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  }
}
