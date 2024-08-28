document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  const gregorianInput = document.getElementById("gregorian");
  const julianInput = document.getElementById("julian");

  // Set today's date in the Gregorian input and calculate its Julian equivalent
  gregorianInput.valueAsDate = new Date();

  // Calculate and set the Julian date based on today's Gregorian date
  julianInput.value = gregorianToJdeDate(gregorianInput.valueAsDate);

  // Attach event listeners for input changes
  gregorianInput.addEventListener("input", handleGregorianInputChange);
  julianInput.addEventListener("input", handleJulianInputChange);
}

function handleGregorianInputChange() {
  const gregorianDate = new Date(this.value);
  const julianInput = document.getElementById("julian");

  if (isValidDate(gregorianDate)) {
    julianInput.value = gregorianToJdeDate(gregorianDate);
    removeInvalidClass(this, julianInput);
  } else {
    addInvalidClass(this);
  }
}

function handleJulianInputChange() {
  const jdeJulianDate = this.value.trim();
  const gregorianInput = document.getElementById("gregorian");

  if (isValidJdeJulianDate(jdeJulianDate)) {
    gregorianInput.valueAsDate = jdeDateToGregorian(jdeJulianDate);
    removeInvalidClass(this, gregorianInput);
  } else {
    addInvalidClass(this);
  }
}

function isValidDate(date) {
  return !isNaN(date.getTime());
}

function isValidJdeJulianDate(jdeJulianDate) {
  const century = parseInt(jdeJulianDate.charAt(0), 10);
  const yearWithinCentury = parseInt(jdeJulianDate.substring(1, 3), 10);
  const dayOfYear = parseInt(jdeJulianDate.substring(3), 10);
  const fullYear = (century + 19) * 100 + yearWithinCentury;

  if (/^\d{5,6}$/.test(jdeJulianDate)) {
    const maxDays = isLeapYear(fullYear) ? 366 : 365;
    return dayOfYear >= 1 && dayOfYear <= maxDays;
  }
  return false;
}

function addInvalidClass(...elements) {
  elements.forEach((el) => el.classList.add("invalid"));
}

function removeInvalidClass(...elements) {
  elements.forEach((el) => el.classList.remove("invalid"));
}

function jdeDateToGregorian(jdeJulianDate) {
  const century = parseInt(jdeJulianDate.charAt(0), 10);
  const yearWithinCentury = parseInt(jdeJulianDate.substring(1, 3), 10);
  const dayOfYear = parseInt(jdeJulianDate.substring(3), 10);
  const fullYear = (century + 19) * 100 + yearWithinCentury;

  const gregorianDate = new Date(Date.UTC(fullYear, 0, 1));
  gregorianDate.setUTCDate(dayOfYear);

  return gregorianDate;
}

function gregorianToJdeDate(gregorianDate) {
  const year = gregorianDate.getFullYear();
  const century = Math.floor(year / 100) - 19;
  const yearWithinCentury = year % 100;
  const startOfYear = new Date(Date.UTC(year, 0, 1));

  const dayOfYear =
    Math.floor((gregorianDate - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  const jdeJulianDate = `${century}${yearWithinCentury
    .toString()
    .padStart(2, "0")}${dayOfYear.toString().padStart(3, "0")}`;

  return jdeJulianDate;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function displayConsoleArt() {
  // console.clear();
  console.log(
    `%c  
  _____ __     __ ______  _____   __  __  ______  _   __     __ _____ 
 / ____|\\ \\   / /|  ____||  __ \\ |  \\/  ||  ____|| |  \\ \\   / /|_   _|
| |  __  \\ \\_/ / | |__   | |__) || \\  / || |__   | |   \\ \\_/ /   | |  
| | |_ |  \\   /  |  __|  |  _  / | |\\/| ||  __|  | |    \\   /    | |  
| |__| |   | |   | |____ | | \\ \\ | |  | || |____ | |____ | |    _| |_ 
 \\_____|   |_|   |______||_|  \\_\\|_|  |_||______||______||_|   |_____|

%c
Date Converter - JD Edwards to Gregorian and back!`,
    "color: #007bff; font-size: 12px; font-weight: bold;", // Title color
    "color: #333; font-size: 12px; font-style: italic;" // Subtitle color
  );
}

// Initialize the inputs with today's date and corresponding Julian date
initialize();

// Run the console art function when the page loads
displayConsoleArt();
