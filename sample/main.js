import * as Unixtime from '../module/date/unixtime.js';
import { parseIsoFormat, toISOString } from '../module/date/dtparser.js';

const lbl1 = document.getElementById("test1");
const lbl2 = document.getElementById("test2");

document.getElementById("button1").addEventListener("click", (e) => {
  if (e.currentTarget !== e.target) {
    return;
  }
  const raw = document.getElementById("date1").value;
  const dtTxt = new Date(raw).toISOString();
  while(lbl1.firstChild) {
    lbl1.removeChild(lbl1.firstChild);
  }
  lbl1.appendChild(document.createTextNode(raw));
  while(lbl2.firstChild) {
    lbl2.removeChild(lbl2.firstChild);
  }
  lbl2.appendChild(document.createTextNode(toISOString(parseIsoFormat(dtTxt))));
});

const obj = {
  // ok
  datetime: "2022-11-17T08:46:10.999Z",
  date: "2022-11-17",
  localDatetime: "2022-11-17T08:46:10.999+09:00",
  localDate: "2022-11-17",
  indefinite: "2022-11-17T08:46:10",
  indefiniteMill: "2022-11-17T08:46:10.999",
  // error
  localTime: "08:46:10",
  time: "08:46:10",
}

const converted = {
  datetime: new Date(obj.datetime),
  date: new Date(obj.date),
  time: new Date(obj.time),
  localDatetime: new Date(obj.localDatetime),
  localDate: new Date(obj.localDate),
  localTime: new Date(obj.localTime),
  indefinite: new Date(obj.indefinite),
  indefiniteMill: new Date(obj.indefiniteMill),
}
console.log("- Date class");

for (const [k, dt] of Object.entries(converted)) {
  try {
    console.log(`datetime(${k}):`, dt.toISOString());
  }
  catch(e) {
    console.error(`datetime(${k}):`, e);
  }
}

console.log("- Unixtime");

console.log("japan locale format (2022/10/11):", Unixtime.fromFormat('2022/10/11').unixtime);
console.log("system (2022-11-17T09:00:00):", Unixtime.fromISOFormat("2022-11-17T09:00:00").unixtime);

console.log("utc == +09:00:", Unixtime.fromISOFormat("2022-11-17T02:46:10Z").unixtime 
    == Unixtime.fromISOFormat("2022-11-17T11:46:10+09:00").unixtime);
console.log("utc == -12:45:", Unixtime.fromISOFormat("2022-11-17T02:46:10.999Z").unixtime
    == Unixtime.fromISOFormat("2022-11-16T14:01:10.999-12:45").unixtime);
console.log("utc == -13:00:", Unixtime.fromISOFormat("2022-11-17T02:46:10.999Z").unixtime
    == Unixtime.fromISOFormat("2022-11-16T13:46:10.999-13:00").unixtime);
