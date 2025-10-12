import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModal } from "@/models/user-model";
import {
  isDateInbetween,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

export async function getAllHotels(destination, checkin, checkout) {
  const regex = new RegExp(destination, "i");

  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsByDestination;

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);
        console.log(found, "found");

        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
  console.log(hotelId, checkin, checkout, "matches 2");
  const matches = await bookingModel.find().lean();

  // .find({ hotelId: hotelId.toString() })

  console.log(matches, "matches");

  const found = matches.find((match) => {
    return (
      isDateInbetween(checkin, match.checkin, match.checkout) ||
      isDateInbetween(checkout, match.checkin, match.checkout)
    );
  });

  console.log(found, "founded 2");

  return found;
}

export async function getHotelById(hotelId, checkin, checkout) {
  console.log({ hotelId, checkin, checkout }, "getHotelById");
  const hotel = await hotelModel.findById(hotelId).lean();
  if (!hotel) {
    return replaceMongoIdInObject({
      _id: "lsdkkf",
      name: "lkdjf",
      address1: "sdf",
      airportCode: "lskdf",
      city: "lskdf",
      countryCode: "dfd",
      highRate: 546,
      lowRate: 564,
      propertyCategory: 23652,
      stateProvinceCode: "",
      thumbNailUrl: "",
      gallery: "",
      overview: "",
      amenities: [],
    });
  }
  console.log(hotel, "hotel data");

  if (hotel && !Array.isArray(hotel) && checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
  return replaceMongoIdInObject(hotel);
}

export async function getRatingsForAHotel(hotelId) {
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}

export async function getReviewsForAHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}

export async function getUserByEmail(email) {
  const users = await userModal.find({ email: email }).lean();
  // console.log(users, "users");
  return replaceMongoIdInArray(users);
}
