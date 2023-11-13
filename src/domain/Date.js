import { ERROR_MESSAGE } from "../constants/message.js";
import { THE_DATE, WEEK } from "../constants/constant.js";
import { Console } from "@woowacourse/mission-utils";

class Date {
  #theDate;

  constructor(input) {
    this.#validDate(input);
    this.#theDate = input;
  }
  #validDate(input) {
    Console.print(input);
    const isNumber = /^[1-9]\d*$/;
    if (!(isNumber.test(input) && input >= THE_DATE.first && input <= THE_DATE.end)) {
      throw new Error(ERROR_MESSAGE.errorDate);
    }
  }

  getChristmasDiscount() {
    if (this.#theDate <= THE_DATE.christmas) {
      return (this.#theDate - 1) * 100 + 1000;
    } else return 0;
  }

  getSpecialDiscount() {
    if (this.#theDate % 7 === WEEK.sunday) {
      return 1000;
    } else return 0;
  }
  getDayOfWeek() {
    return this.#theDate % 7;
  }
}
export default Date;
