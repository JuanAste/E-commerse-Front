import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { score, comment, name, image, userId, ProductId } = req.body;
    await Review.create({
      score,
      comment,
      name,
      image,
      userId,
      ProductId,
    });

    const reviews = await Review.find({ ProductId });

    const totalScore = reviews.reduce(
      (acc, rev) => acc + parseInt(rev.score),
      0
    );
    const averageScore = totalScore / reviews.length;

    await Product.updateOne({ _id: ProductId }, { score: averageScore });

    res.json(true);
  }

  if (method === "PUT") {
    const { score, comment, name, image, userId, ProductId, _id } = req.body;
    await Review.updateOne(
      { _id },
      {
        score,
        comment,
        name,
        image,
        userId,
        ProductId,
      }
    );

    const reviews = await Review.find({ ProductId });

    const totalScore = reviews.reduce(
      (acc, rev) => acc + parseInt(rev.score),
      0
    );
    const averageScore = totalScore / reviews.length;

    await Product.updateOne({ _id: ProductId }, { score: averageScore });

    res.json(true);
  }
}
