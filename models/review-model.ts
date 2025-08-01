import mongoose, { Schema, Types } from "mongoose";

const reviewSchema = new Schema({
  hotelId: {
    required: true,
    type: Types.ObjectId,
  },
  userId: {
    required: true,
    type: Types.ObjectId,
  },
  review: {
    required: true,
    type: Number,
  },
});

export const reviewModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);
