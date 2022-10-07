const addDateSuffix = (date) => {
    let dateString = date.toString();

    const lastChar = dateString.charAt(dateString.length -1);

    if (lastChar === '1' && dateString !== '11'){
        dateString = `${dateString}st`;
    } else if (lastChar === '2' && dateString !== '12'){
        dateString = `${dateString}nd`;
    } else if (lastChar === '3' && dateString !== '13'){
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }
    return dateString;
};

module.exports = (
    timestamp, { monthLength = 'short', dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };
  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }
  const minutes = (dateObj.getMinutes() < 10 ? "0" : "") + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};