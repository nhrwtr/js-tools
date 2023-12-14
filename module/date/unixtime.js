import { localTimezone } from "./timezone.js";
import { parseIsoFormat, parseJstFormat } from "./dtparser.js";

const daysInYear = 24 * 60 * 60;
const unixEpochDay = ~~(1969 * 365 + 1969 / 4 - 1969 / 100 + 1969 / 400 + 306);

const year1Days = 365;
const year4Days = year1Days * 4 + 1;
const year100Days = year4Days * 25 - 1;
const year400Days = year100Days * 4 + 1;

const _monthDays = [0, 31, 61, 92, 122, 153, 184, 214, 245, 275, 306, 337];

const fromUnixtime = (unixtime) => {
  let seconds = ~~(unixtime % 60);
  let minutes = ~~((unixtime / 60) % 60);
  let hours = ~~((unixtime / 3600) % 24);

  let epochDays = ~~(unixtime / daysInYear);
  // epoch day is thousday (+3)
  let weekday = (epochDays + 3) % 7;
  // start to 0000/03/01
  let totalDays = epochDays + unixEpochDay;

  let year = 400 * ~~(totalDays / year400Days);
  totalDays %= year400Days;

  const n = ~~(totalDays / year100Days);
  year += n * 100;
  totalDays %= year100Days;

  const leap = false;
  if (n == 4) {
    leap = true;
  }
  else {
    year += 4 * ~~(totalDays / year4Days);
    totalDays %= year4Days;

    const n = ~~(totalDays / year1Days);
    year += n;
    totalDays %= year1Days;
    if (n == 4) {
      leap = true;
    }
  }

  let months = 0;
  let days = 0;
  if (leap) {
    months = 2;
    days = 29;
  }
  else {
    months = ~~((totalDays * 5 + 2) / 153);
    days = totalDays - _monthDays[months] + 1;
    months += 3;
    if (months > 12) {
      ++year;
      months -= 12;
    }
  }

  return {
    years: year,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    weekday: weekday,
  }
};

const toUnixtime = (year = 1970, month = 1, day = 1, hour = 0, minute = 0, second = 0) => {
  if (month < 3) {
    month += 12;
    --year;
  }

  // zero start from March
  month -= 3;
  const yearsPer100 = ~~(year / 100);
  let resultDays = year * year1Days;
  resultDays += (year >> 2) - yearsPer100 + (yearsPer100 >> 2);
  resultDays += _monthDays[month];
  resultDays += day - 1;
  resultDays -= unixEpochDay;
  let unixtime = resultDays * daysInYear;
  unixtime += hour * 60 * 60;
  unixtime += minute * 60;
  unixtime += second;
  return unixtime;
};

/**
 * ISO 8601拡張形式の日付文字列をエポックタイムに変換する
 * @param {string} dateTimeText ISO 8601形式の日付文字列
 */
const fromISOFormat = (dateTimeText) => {
  const dtInfo = parseIsoFormat(dateTimeText);

  let unixtime = toUnixtime(dtInfo.year, dtInfo.month, dtInfo.day, dtInfo.hour, dtInfo.minute, dtInfo.second);
  // convert to utc
  unixtime -= dtInfo.tzDelta;
  return { unixtime, ticks: dtInfo.ticks };
};

/**
 * yyyy/mm/dd形式の日付文字列をDateクラスに変換する
 * @param {string} dateText yyyy/mm/dd形式の日付文字列
 */
const fromFormat = (dateText) => {
  const dtInfo = parseJstFormat(dateText);

  let unixtime = toUnixtime(dtInfo.year, dtInfo.month, dtInfo.day, 0, 0, 0);
  // local to utc
  unixtime -= localTimezone().timedelta;
  return { unixtime, ticks: 0 };
};

export { fromISOFormat, fromFormat, toUnixtime, fromUnixtime };