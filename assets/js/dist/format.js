export { dateFormat };

function dateFormat(date) {
  //should eventually fix to make it look out for other types of date formats
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var returnValue = "";

  if (typeof date != "string") {
    returnValue = " ";
  } else {
    //2022-06-03 format, yyyy, mm, dd (add if statement at some point)
    var day = date.substring(8);

    if (day.substring(1) == 1) {
      day = day + "st, ";
    } else if (day.substring(1) == 2) {
      day = day + "nd, ";
    } else if (day.substring(1) == 3) {
      day = day + "rd, ";
    } else {
      day = day + "th, ";
    }

    if (day.substring(0) == 0) {
      day = day.substring(1);
    }

    var month = date.substring(5, 7);
    month = months[month - 1];
    month = month + " ";
    var year = date.substring(0, 4);
    returnValue = month + day + year;
  }

  return returnValue;
}