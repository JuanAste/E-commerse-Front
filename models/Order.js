const { Schema, model, models, default: mongoose } = require("mongoose");

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    paid: Boolean,
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = models.Order || model("Order", OrderSchema);
