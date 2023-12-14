/**
 * 日時構造体 - date-time(offset) structure
 */
class DateTimeStructure {
  _year = 0;
  _month = 1;
  _day = 1;
  _hour = 0;
  _minute = 0;
  _second = 0;
  _ticks = 0;
  _tzDelta = 0;

  /**
   * 日時構造体を作成する。 - create date-time(offset) structure. 
   * @param {number} year 年 - year (0-9999)
   * @param {number} month 月 - month (1-12)
   * @param {number} day 日 - day (1-31)
   * @param {number} hour 時 - hour (0-24)
   * @param {number} minute 分 - minute (0-59)
   * @param {number} second 秒 - second (0-59)
   * @param {number} ticks ミリ秒 - ticks (millseconds)
   * @param {number} tzDelta 時差 - timezone (seconds)
   */
  constructor(year = 0, month = 1, day = 1, hour = 0, minute = 0, second = 0, ticks = 0, tzDelta = 0)
  {
    this._year = year;
    this._month = month;
    this._day = day;
    this._hour = hour;
    this._minute = minute;
    this._second = second;
    this._ticks = ticks;
    this._tzDelta = tzDelta;
  }
  
  get year() {
    return this._year;
  }

  get month() {
    return this._month;
  }
  
  get day() {
    return this._day;
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

  get ticks() {
    return this._ticks;
  }

  get tzDelta() {
    return this._tzDelta;
  }
}

export { DateTimeStructure };