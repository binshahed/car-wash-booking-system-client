import moment from "moment";

export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const duration = moment.duration(minutes, "minutes");
  const hours = Math.floor(duration.asHours());
  const mins = duration.minutes();

  return `${hours > 0 ? `${hours} hours` : ""} ${
    mins > 0 ? `${mins} minutes` : ""
  }`;
};
