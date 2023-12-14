import { DateTimeStructure } from "./date.js";
import { isNullOrEmpty } from "../utils.js";
import { localTimezone } from "./timezone.js"
import * as conv from '../num-conv.js'

const dateSeparator = '-';
const dateTimeSeparotor = 'T';
const timeSeparator = ':';
const mills = '.';

/**
 * ISO 8601拡張形式の日時文字列から日時構造体を作成する
 * @param {string} dateTimeText ISO 8601拡張形式の日時文字列
 * @returns 日時構造体
 */
const parseIsoFormat = (dateTimeText) => {
    let regs = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])(|(\.|,)(\d{3}))(|Z|(\+|-)([01][0-9]|2[0-4]):?([0-5][0-9])?)$/;
    const dtStr = dateTimeText.match(regs);
    if (dtStr == null) {
      return null;
    }

    const year = parseInt(dtStr[1]);
    const month = parseInt(dtStr[2]);
    const day = parseInt(dtStr[3]);
    const hour = parseInt(dtStr[4]);
    const minute = parseInt(dtStr[5]);
    const second = parseInt(dtStr[6]);
    const ticks = parseInt(dtStr[9] ?? 0);
    
    let tzDelta = 0;
    if (dtStr[10] == 'Z') {
      // UTC timezone
      tzDelta = 0;
    }
    else if (isNullOrEmpty(dtStr[10])) {
      // local timezone
      tzDelta = localTimezone.offset;
    }
    else {
      tzDelta = parseInt(dtStr[12]) * 3600 + parseInt(dtStr[13]) * 60;
      if (dtStr[11] == '-') {
        tzDelta = -(tzDelta);
      }
    } 

    return new DateTimeStructure(year, month, day, hour, minute, second, ticks, tzDelta);
};

const parseJstFormat = (dateText) => {
    const dateStr = dateText.split('/', 3);
    const year = parseInt(dateStr[0]);
    const month = parseInt(dateStr[1]);
    const day = parseInt(dateStr[2]);

    return new DateTimeStructure(year, month, day);
};

/**
 * ISO 8601拡張形式の日時文字列から日時構造体を作成する
 * @param {DateTimeStructure} dtInfo 日時構造体
 * @returns ISO 8601拡張形式の日時文字列
 */
const toISOString = (dtInfo) => {
  const year = conv.zeroPadding(dtInfo.year, 4);
  const month = conv.zeroPadding(dtInfo.month, 2);
  const day = conv.zeroPadding(dtInfo.day, 2);
  const hour = conv.zeroPadding(dtInfo.hour, 2);
  const minute = conv.zeroPadding(dtInfo.minute, 2);
  const second = conv.zeroPadding(dtInfo.second, 2);

  let str = [year, month, day].join(dateSeparator);
  str += dateTimeSeparotor;
  str += [hour, minute, second].join(timeSeparator);

  if (dtInfo.tzDelta == 0) {
    str += 'Z';
  }
  else if (dtInfo.tzDelta > 0){
    const tzHour = dtInfo.tzDelta / 60;
    const tzMinute = (dtInfo.tzDelta % 60) / 60;
    str += `+${conv.zeroPadding(tzHour, 2)}:${conv.zeroPadding(tzMinute, 2)}`;
  }
  else {
    const tzHour = -dtInfo.tzDelta / 60;
    const tzMinute = (dtInfo.tzDelta % 60) / 60;
    str += `-${conv.zeroPadding(tzHour, 2)}:${conv.zeroPadding(tzMinute, 2)}`;
  }
  return str;
};

/**
 * ISO 8601拡張形式の日時文字列から日時構造体を作成する
 * @param {DateTimeStructure} dtInfo 日時構造体
 * @returns ISO 8601拡張形式の日時文字列
 */
const toISOStringDetail = (dtInfo) => {

  const year = conv.zeroPadding(dtInfo.year, 4);
  const month = conv.zeroPadding(dtInfo.month, 2);
  const day = conv.zeroPadding(dtInfo.day, 2);
  const hour = conv.zeroPadding(dtInfo.hour, 2);
  const minute = conv.zeroPadding(dtInfo.minute, 2);
  const second = conv.zeroPadding(dtInfo.second, 2);

  let str = [year, month, day].join(dateSeparator);
  str += dateTimeSeparotor;
  str += [hour, minute, second].join(timeSeparator);

  const microsecond = datetime.microseconds;
  if (microsecond > 0) {
    str += mills + microsecond;
  }

  if (dtInfo.tzDelta == 0) {
    str += 'Z';
  }
  else if (dtInfo.tzDelta > 0){
    const tzHour = dtInfo.tzDelta / 60;
    const tzMinute = (dtInfo.tzDelta % 60) / 60;
    str += `+${conv.zeroPadding(tzHour, 2)}:${conv.zeroPadding(tzMinute, 2)}`;
  }
  else {
    const tzHour = -dtInfo.tzDelta / 60;
    const tzMinute = (dtInfo.tzDelta % 60) / 60;
    str += `-${conv.zeroPadding(tzHour, 2)}:${conv.zeroPadding(tzMinute, 2)}`;
  }
  return str;
};

export { parseIsoFormat, parseJstFormat, toISOString };