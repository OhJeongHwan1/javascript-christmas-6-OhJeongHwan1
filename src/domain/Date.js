import { ERROR_MESSAGE } from "../constants/message.js";
import { THE_DATE, WEEK } from "../constants/constant.js";

class Date {
  #theDate;

  constructor(input) {
    this.validDate(input);
    this.#theDate = input;
  }
  validDate(input) {
    const isNumber = /^[1-9]\d*$/;
    if (!(isNumber.test(input) && input >= THE_DATE.first && input <= THE_DATE.end)) {
      throw new Error(ERROR_MESSAGE.errorDate);
    }
  }

  getDate() {
    return this.#theDate;
  }

  getChristmasDiscount() {
    return this.#theDate <= THE_DATE.christmas ? (this.#theDate - 1) * 100 + 1000 : 0;
  }

  getSpecialDiscount() {
    return this.#theDate % 7 === WEEK.sunday || this.#theDate === THE_DATE.christmas ? 1000 : 0;
  }

  getDayOfWeek() {
    return this.#theDate % 7;
  }
}
export default Date;
