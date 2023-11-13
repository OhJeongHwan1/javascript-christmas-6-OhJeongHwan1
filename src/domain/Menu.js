import { MENU_NUMBER, ALL_MENU } from "../constants/constant.js";
import { ERROR_MESSAGE } from "../constants/message.js";
import { Console } from "@woowacourse/mission-utils";

class Menu {
  #name;
  #number;
  #price;

  constructor(name, number) {
    this.#validMenuName(name);
    this.#validMenuNumber(number);
    this.#setPrice(name);
    this.#name = name;
    this.#number = number;
  }
  #validMenuName(name) {
    const menuNames = ALL_MENU.map((menu) => menu.name);
    if (!menuNames.includes(name)) {
      throw new Error(ERROR_MESSAGE.errorMenu);
    }
  }

  #validMenuNumber(number) {
    if (!(number >= MENU_NUMBER.minimum)) {
      throw new Error(ERROR_MESSAGE.errorMenu);
    }
  }

  #setPrice(name) {
    const foundMenu = ALL_MENU.find((menu) => menu.name === name);
    this.#price = foundMenu.price;
  }

  getName() {
    return this.#name;
  }

  getNumber() {
    return this.#number;
  }

  getPrice() {
    return this.#price;
  }
}
export default Menu;