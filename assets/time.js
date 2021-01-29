//Time Management - Date
const dateInfo = new Date();
let date = dateInfo.getDate();
let day = dateInfo.getDay();
let month = dateInfo.getMonth();

//Time Management - Time
//will need to call a new Date to keep time updated, otherwise will always refer to time from page load

function returnTime() {
  return `${new Date().toLocaleTimeString([], {
    timeStyle: "short",
  })}`;
}

//converting numbers to strings
function getDayName(day) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}

function getMonthName(month) {
  switch (month) {
    case 0:
      return "January";

    case 1:
      return "February";

    case 2:
      return "March";

    case 3:
      return "April";

    case 4:
      return "May";

    case 5:
      return "June";

    case 6:
      return "July";

    case 7:
      return "August";

    case 8:
      return "September";

    case 9:
      return "October";

    case 10:
      return "November";

    case 11:
      return "December";
  }
}

//simple function to determine number ending
function checkDate() {
  if (date === 1) {
    return "st";
  } else if (date === 2) {
    return "nd";
  } else if (date === 3) {
    return "rd";
  } else {
    return "th";
  }
}
