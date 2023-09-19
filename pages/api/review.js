import { mongooseConnect } from "@/lib/mongoose";
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
    res.json(true);
  }
}
