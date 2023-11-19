import InputView from "../views/InputView.js";
import Menu from "./Menu.js";
import { ERROR_MESSAGE } from "../constants/message.js";

class MenuSlider {
  static async getSlideMenu() {
    const menus = await InputView.readMenu();
    const splitMenus = menus.split(",");
    const menuList = [];

    splitMenus.forEach((menu) => {
      this.checkMenuFormat(menu);
      let [name, number] = menu.split("-");
      menuList.push(new Menu(name.trim(), Number(number)));
    });

    return menuList;
  }

  static checkMenuFormat(menu) {
    let [name, number] = menu.split("-");
    if (!(name && number)) {
      throw new Error(`${ERROR_MESSAGE.errorMenu}`);
    }
  }
}
export default MenuSlider;
