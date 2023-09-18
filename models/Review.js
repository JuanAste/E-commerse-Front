const { Schema, model, models, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema(
  {
    score: String,
    coment: Text,
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    ProductId: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);

export const Review = models.Review || model("Review", ReviewSchema);
