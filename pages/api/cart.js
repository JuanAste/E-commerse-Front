import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  const products = await Product.find({ _id: ids, enabled: true });
  if (products.length) {
    res.json(products);
  } else {
    res.status(404).json("product not found");
  }
}
