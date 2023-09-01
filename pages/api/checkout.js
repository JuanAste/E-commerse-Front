import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handle(req, res) {
  try {
    if (req.method !== "POST") {
      res.json("should be a POST request");
      return;
    }

    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body;
    await mongooseConnect();

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfo = await Product.find({ _id: uniqueIds });
    const line_items = [];
    for (const productId of uniqueIds) {
      const productInfo = productsInfo.find(
        (p) => p._id.toString() === productId
      );
      const quantity =
        productsIds.filter((id) => id === productId)?.length || 0;
      if (!productInfo) {
        res.status(404).json("Product not found");
        return;
      }

      if (!productInfo.enabled) {
        res.status(400).json("Product disabled");
        return;
      }

      if (quantity > 0) {
        if (productInfo.stock < quantity) {
          res.status(400).json("Product out of stock");
          return;
        }

        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: productInfo.title,
              images: [productInfo.images[0]],
            },
            unit_amount: quantity * productInfo.price * 100,
          },
        });

        await Product.updateOne(
          { _id: productInfo._id },
          {
            $inc: {
              stock: -quantity,
              sells: +quantity,
            },
          }
        );
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
      metadata: {
        orderId: orderDoc._id.toString(),
      },
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    res.send(error.message);
  }
}

