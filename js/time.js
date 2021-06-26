const CHECK_TIMES = ['12:00', '13:00', '14:00'];

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');


const syncValues = function (element, value) {
  element.value = value;
};

const timeInSelectHandler = function () {
  window.synchronizeFields(timeIn, timeOut, CHECK_TIMES, CHECK_TIMES, syncValues);
};

const timeOutSelectHandler = function () {
  window.synchronizeFields(timeOut, timeIn, CHECK_TIMES, CHECK_TIMES, syncValues);
};

timeIn.addEventListener('change', timeInSelectHandler);
timeOut.addEventListener('change', timeOutSelectHandler);
