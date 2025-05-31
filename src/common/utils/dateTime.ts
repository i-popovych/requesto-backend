export const getDateTimeStringFromTimestamp = (timestamp) => {
  if (!timestamp) return '';

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get the ISO string (this will be in UTC)
  const isoString = date.toISOString();

  // Get the timezone offset in minutes and convert it to hours and minutes
  const offset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(offset / 60);
  const offsetMinutes = offset % 60;

  // Format the offset as "+HH:MM" or "-HH:MM"
  const offsetString =
    (offset >= 0 ? '+' : '-') +
    String(Math.abs(offsetHours)).padStart(2, '0') +
    ':' +
    String(Math.abs(offsetMinutes)).padStart(2, '0');

  // Remove the 'Z' at the end of the ISO string and append the offset
  return isoString.slice(0, -1) + offsetString;
};

export const getDateFromTimestamp = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
