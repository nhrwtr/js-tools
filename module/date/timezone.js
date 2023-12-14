import { zeroPadding } from "../num-conv.js";

const hoursPerSecond = 60 * 60;

class TzStandard {
  _hour = 0;
  _minute = 0;
  _second = 0;
  _timedelta = 0;
  _offset = "Z";

  get hour() {
    return this._hour;
  }

  get minute() {
    return this._minute;
  }

  get second() {
    return this._second;
  }

  get timedelta() {
    return this._timedelta;
  }

  get offset() {
    return this._offset;
  }
}

class JapanStandardTimezone extends TzStandard {
  constructor() {
    super();

    this._hour = 9;
    this._minute = 0;
    this._second = 0;
    this._timedelta = 9 * hoursPerSecond;
    this._offset = "+09:00";
  }
}

class Timezone {
  _hour = 0;
  _minute = 0;
  _second = 0;
  _timedelta = 0;
  _offset = "Z";

  /**
   * 日時構造体を作成する。 - create date-time(offset) structure. 
   * @param {number} hour 時 - hour (-24-24)
   * @param {number} minute 分 - minute (0-59)
   * @param {number} second 秒 - second (0-59)
   */
  constructor(hour = 0, minute = 0, second = 0) {
    this._hour = hour;
    this._minute = minute;
    this._second = second;
    this._timedelta = (hour * hoursPerSecond) + (minute * 60) + second;
    this.setOffset(hour, second, second);
  }

  setOffset(hour = 0, minute = 0, second = 0) {
    if (hour * minute * second == 0) {
      this._offset = "Z";
    }
    else if (hour * minute * second < 0) {
      this._offset = `-${zeroPadding(-hour, 2)}:${zeroPadding(hour, 2)}`;
    }
    else if (hour * minute * second > 0) {
      this._offset = `+${zeroPadding(-hour, 2)}:${zeroPadding(hour, 2)}`;
    }
  }

  setTimeDelta(second) {
    this._hour = ~~(second / hoursPerSecond);
    let num = second % hoursPerSecond
    this._minute = ~~(num / 60);
    this._second = num % 60;
    this._timedelta = (this._hour * hoursPerSecond) + (this._minute * 60) + this._second;
    this.setOffset(this._hour, this._minute, this._second);
  }
  
  get hour() {
    return this._hour;
  }

  get minute() {
    return this._minute;
  }

  get second() {
    return this._second;
  }

  get timedelta() {
    return this._timedelta;
  }

  get offset() {
    return this._offset;
  }
}

const _tzNameList = {
  'Etc/UTC': new TzStandard(),
  'Etc/GMT': new TzStandard(),
  'Asia/Tokyo': new JapanStandardTimezone(),
};

const localTimezone = () => {
  const tz = new Timezone();
  tz.setTimeDelta(-1 * new Date().getTimezoneOffset() * 60)
  return tz;
};

export { TzStandard as UtcTimezone, JapanStandardTimezone, Timezone, localTimezone };