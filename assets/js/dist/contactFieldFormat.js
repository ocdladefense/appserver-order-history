export { cityFormatter, stateFormatter, createMemberX };

function cityFormatter(value) {
  //this function is to fix an issue with them having no location but the field for it still coming up on mobile
  var returnValue = "attendee-city";

  if (!value) {
    returnValue = " ";
  }

  return returnValue;
}

function stateFormatter(value) {
  var returnValue = " ";

  if (!value) {
    returnValue = " ";
  }

  if (value && value.toString() == "Oregon") {
    returnValue = " ";
  } else if (value && value.toString() != "Oregon") {
    returnValue = ", " + value;
  }

  if (!value) {
    returnValue = " ";
  }

  return returnValue;
}

function createMemberX(value) {
  var returnValue = " ";

  if (value == true) {
    returnValue = " (X)";
  } else {
    returnValue = " ";
  }

  return returnValue;
}