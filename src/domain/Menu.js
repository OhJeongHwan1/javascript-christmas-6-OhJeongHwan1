import { MENU_NUMBER, ALL_MENU } from "../constants/constant.js";
import { ERROR_MESSAGE } from "../constants/message.js";

class Menu {
  #name;
  #number;

  constructor(name, number) {
    this.#validMenuName(name);
    this.#validMenuNumber(number);
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
    if (!(number >= MENU_NUMBER.minimum && number <= MENU_NUMBER.maximum)) {
      throw new Error(ERROR_MESSAGE.errorMenu);
    }
  }

  getName() {
    return this.#name;
  }

  getNumber() {
    return this.#number;
  }
}
export default Menu;
