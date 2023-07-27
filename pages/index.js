import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  const featureProductId = "64bff097f713bcaebdee5ef7";
  mongooseConnect();
  const product = await Product.findById(featureProductId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
