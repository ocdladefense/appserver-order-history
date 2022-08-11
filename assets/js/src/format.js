export { dateFormat };


function dateFormat(date) {
    //should eventually fix to make it look out for other types of date formats
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    let returnValue = "";
    if ((typeof date) != "string") {
      returnValue = " ";
    }
    else {
        //2022-06-03 format, yyyy, mm, dd (add if statement at some point)
        let day = date.substring(8);
        if (day.substring(1) == 1) {
            day = day + "st, ";
        }
        else if (day.substring(1) == 2) {
            day = day + "nd, ";
        }
        else if (day.substring(1) == 3) {
            day = day + "rd, ";
        }
        else {
            day = day + "th, ";
        }
        if (day.substring(0) == 0) {
            day = day.substring(1);
        }
        let month = date.substring(5,7);
        month = months[month - 1];
        month = month + " ";
        let year = date.substring(0,4);
        returnValue = month + day + year;
    }
    return returnValue;
  }
