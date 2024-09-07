/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMostRecentBookingSlot } from "../utils/getRecentBooking";
import moment from "moment";

const CountDown = ({ booking }: { booking: any }) => {
  // Get the most recent booking slot
  const countDownData = getMostRecentBookingSlot(booking?.data);

  // Construct the countdown time string
  const countDownTimeString = `${countDownData?.date}T${countDownData?.startTime}:00`;

  // Function to calculate time left
  function calculateTimeLeft(targetTime: string) {
    const now = moment();
    const target = moment(targetTime);
    const duration = moment.duration(target.diff(now));

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    };
  }

  // Initialize time left
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(countDownTimeString)
  );

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(countDownTimeString));
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [countDownTimeString]);

  return (
    countDownData && (
      <span>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
        {timeLeft.seconds}s
      </span>
    )
  );
};

export default CountDown;
