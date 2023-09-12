import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

export default function Home({ featureProduct, newProducts }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [featureProduct, newProducts]);

  return (
    <div>
      <Header />
      {loading ? null : (
        <>
          <Featured product={featureProduct} />
          <NewProducts products={newProducts} />
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featureProduct = await Product.findOne().sort({ createdAt: -1 }).exec();
  const newProducts = await Product.find({}, null, {
    sort: { createdAt: -1 },
    limit: 12,
  });
  if (!featureProduct) {
    console.log("No products were found in the database.");
  } else {
    return {
      props: {
        featureProduct: JSON.parse(JSON.stringify(featureProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      },
    };
  }
}
