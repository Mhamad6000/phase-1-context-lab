/* Your Code Here */
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(arrays) {
  const newArr = arrays.map((array) => {
    return createEmployeeRecord(array);
  });
  return newArr;
}
function createTimeInEvent(timeStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeStamp.slice(timeStamp.indexOf(" ") + 1)),
    date: timeStamp.slice(0, timeStamp.indexOf(" ")),
  });
  return this;
}
function createTimeOutEvent(timeStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeStamp.slice(timeStamp.indexOf(" ") + 1)),
    date: timeStamp.slice(0, timeStamp.indexOf(" ")),
  });
  return this;
}
function hoursWorkedOnDate(timeStamp) {
  const indate = this.timeInEvents.find((timeInEvent) => {
    return timeInEvent.date === timeStamp;
  });
  const outdate = this.timeOutEvents.find((timeInEvent) => {
    return timeInEvent.date === timeStamp;
  });
  let hour1 = 0;
  let hour2 = 0;
  hour2 = parseInt(outdate.hour.toString().slice(0, 2));
  hour1 = parseInt(indate.hour.toString().slice(0, 2));
  if (outdate.hour.toString().length === 3) {
    hour2 = parseInt(outdate.hour.toString().slice(0, 1));
  }
  if (indate.hour.toString().length === 3) {
    hour1 = parseInt(indate.hour.toString().slice(0, 1));
  }
  return hour2 - hour1;
}
function wagesEarnedOnDate(timeStamp) {
  const result = hoursWorkedOnDate.call(this, timeStamp);
  return result * this.payPerHour;
}
function findEmployeeByFirstName(arrayOfEmployes, fName) {
  const result = arrayOfEmployes.find((e) => e.firstName === fName);
  return result;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  let sum = 0;

  this.timeInEvents.map((day) => {
    sum += wagesEarnedOnDate.call(this, day.date);
  });
  return sum;
  // const payable = eligibleDates.reduce(
  //   function (memo, d) {
  //     return memo + wagesEarnedOnDate.call(this, d);
  //   }.bind(this),
  //   0
  // ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  // return payable;
};
function calculatePayroll(array) {
  let sum = 0;
  array.map((person) => {
    sum += allWagesFor.call(person);
  });
  return sum;
}
