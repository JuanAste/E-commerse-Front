import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "PUT") {
    const { name, email, country, city, streetAddress, postalCode, _id } =
      req.body;
    await User.updateOne(
      { _id },
      {
        name,
        email,
        country,
        city,
        streetAddress,
        postalCode,
      }
    );
    res.json(true);
  }
}
