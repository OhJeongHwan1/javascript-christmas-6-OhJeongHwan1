import InputView from "../views/InputView.js";
import Menu from "./Menu.js";

class MenuSlider {
  constructor() {}

  async getSlideMenu() {
    const menus = await InputView.readMenu();
    const splitMenus = menus.split(",");
    const menuList = [];

    splitMenus.forEach((menu) => {
      let [name, number] = menu.split("-");
      menuList.push(new Menu(name.trim(), Number(number)));
    });

    return menuList;
  }
}
export default MenuSlider;
