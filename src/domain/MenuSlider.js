import InputView from "../views/InputView.js";
import Menu from "./Menu.js";
import { ERROR_MESSAGE } from "../constants/message.js";

class MenuSlider {
  constructor() {}

  async getSlideMenu() {
    const menus = await InputView.readMenu();
    const splitMenus = menus.split(",");
    const menuList = [];

    splitMenus.forEach((menu) => {
      let [name, number] = menu.split("-");
      this.#checkMenuFormat(name, number);
      menuList.push(new Menu(name.trim(), Number(number)));
    });

    return menuList;
  }

  #checkMenuFormat(name, number) {
    if (!(name && number)) {
      throw new Error(`${ERROR_MESSAGE.errorMenu}`);
    }
  }
}
export default MenuSlider;
