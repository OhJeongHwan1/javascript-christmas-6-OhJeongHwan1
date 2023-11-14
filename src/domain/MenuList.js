import { ERROR_MESSAGE } from "../constants/message.js";
import { MENU_NUMBER, BEVERAGE, DESSERT, MAIN } from "../constants/constant.js";

class MenuList {
  #menuList;
  constructor(menuList) {
    this.exceedMenuList(menuList);
    this.sameMenuList(menuList);
    this.checkOnlyBeverage(menuList);
    this.#menuList = menuList;
  }
  exceedMenuList(menuList) {
    const totalNumber = menuList.reduce((sum, menu) => sum + menu.getNumber(), 0);
    if (totalNumber > MENU_NUMBER.maximum) {
      throw new Error(ERROR_MESSAGE.exceedMenu);
    }
  }
  sameMenuList(menuList) {
    const menuNames = menuList.map((menu) => menu.getName());
    const setMenuNames = new Set(menuNames);
    if (menuNames.length !== setMenuNames.size) {
      throw new Error(ERROR_MESSAGE.errorMenu);
    }
  }
  checkOnlyBeverage(menuList) {
    const beverageList = menuList.filter((menu) => BEVERAGE.includes(menu.getName()));
    if (beverageList.length === menuList.length) {
      throw new Error(ERROR_MESSAGE.onlyBeverage);
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

  checkDessertNumber() {
    return this.#menuList.reduce((sum, menu) => (DESSERT.includes(menu.getName()) ? sum + menu.getNumber() : sum), 0);
  }

  checkMainNumber() {
    return this.#menuList.reduce((sum, menu) => (MAIN.includes(menu.getName()) ? sum + menu.getNumber() : sum), 0);
  }
}
export default MenuList;
