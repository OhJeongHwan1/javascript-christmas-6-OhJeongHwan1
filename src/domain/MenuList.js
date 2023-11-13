import { ERROR_MESSAGE } from "../constants/message.js";
import { MENU_NUMBER } from "../constants/constant.js";
import { Console } from "@woowacourse/mission-utils";

class MenuList {
  #menuList;
  constructor(menuList) {
    this.#exceedMenuList(menuList);
    this.#sameMenuList(menuList);
    this.#menuList = menuList;
  }
  #exceedMenuList(menuList) {
    const totalNumber = menuList.reduce((sum, menu) => sum + menu.getNumber(), 0);
    if (totalNumber > MENU_NUMBER.maximum) {
      throw new Error(ERROR_MESSAGE.exceedMenu);
    }
  }
  #sameMenuList(menuList) {
    const menuNames = menuList.map((menu) => menu.getName());
    const setMenuNames = new Set(menuNames);
    if (menuNames.length !== setMenuNames.size) {
      throw new Error(ERROR_MESSAGE.errorMenu);
    }
  }
  getMenuList() {
    return this.#menuList;
  }

  getTotalAmount() {
    let totalAmount = 0;
    this.#menuList.forEach((menu) => {
      totalAmount = totalAmount + menu.getPrice() * menu.getNumber();
    });
    return totalAmount;
  }
}
export default MenuList;
