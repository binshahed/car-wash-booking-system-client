/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

export const getMostRecentBookingSlot = (bookings: any) => {
  if (!bookings?.length) return null;

  const bookingsCopy = [...bookings];

  const sortedBookings = bookingsCopy.sort((a: any, b: any) => {
    const dateTimeA = moment(
      `${a.slot.date} ${a.slot.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    const dateTimeB = moment(
      `${b.slot.date} ${b.slot.startTime}`,
      "YYYY-MM-DD HH:mm"
    );
    return dateTimeB.diff(dateTimeA);
  });

  return sortedBookings[0].slot;
};
