import { bookingModel } from "@/models/booking-model";
import { NextResponse, NextRequest } from "next/server";

import mongoose from "mongoose";
import { dbConnect } from "@/service/mongos";

export const POST = async (reques) => {
  const { hotelId, userId, checkin, checkout } = await reques.json();

  await dbConnect();

  const payload = {
    hotelId: new mongoose.Types.ObjectId(hotelId),
    userId: new mongoose.Types.ObjectId(userId),
    checkin,
    checkout,
  };

  try {
    await bookingModel.create(payload);
    return new NextResponse("A New Booking has been made", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
};
