const obj = {
  datetime: "2022-11-17T02:46:10.999Z",
  date: "2022-11-17",
  time: "02:46:10",
  localDatetime: "2022-11-17T02:46:10.999+09:00",
  localDate: "2022-11-17",
  localTime: "02:46:10",
}

const converted = {
  datetime: new Date(Date.parse(obj.datetime)),
  date: new Date(Date.parse(obj.date)),
  time: new Date(Date.parse(obj.time)),
  localDatetime: new Date(Date.parse(obj.localDatetime)),
  localDate: new Date(Date.parse(obj.localDate)),
  localTime: new Date(Date.parse(obj.localTime)),
}

console.log(converted);
console.log("datetime (utc -> Date):", converted.datetime.toISOString());
console.log("datetime (local -> Date):", converted.localDatetime.toISOString());
console.log("date only (utc -> Date):", converted.date.toISOString());     /* timezone is not applicable */
console.log("date only (local -> Date):", converted.localDate.toISOString());     /* timezone is not applicable */
console.log("time only (utc -> Date):", converted.time.toISOString());     /* undefined */
console.log("time only (local -> Date):", converted.localTime.toISOString());     /* undefined */
