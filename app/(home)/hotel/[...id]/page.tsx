import { getReviewsForAHotel } from "@/database/quries";
import React from "react";

// catch segment component
export default async function Review({ params }) {
  const { id } = await params;
  const reviews = await getReviewsForAHotel(id[0]);

  return (
    <div className="mt-28 max-w-7xl mx-auto">
      <h1>Catch-all Degment</h1>
      {reviews.map((item) => (
        <p key={item.id}>{item.review}</p>
      ))}
    </div>
  );
}
