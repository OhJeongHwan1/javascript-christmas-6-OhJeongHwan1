import MenuSlider from "./domain/MenuSlider.js";
import MenuList from "./domain/MenuList.js";
import Date from "./domain/Date.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";

class App {
  #date;
  #menuList;

  constructor() {
    this.#date = 0;
    this.#menuList = [];
  }
  async getDate() {
    while (true) {
      try {
        this.#date = new Date(await InputView.readDate());
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
  async getMenus() {
    while (true) {
      try {
        const menuslider = new MenuSlider();
        this.#menuList = new MenuList(await menuslider.getSlideMenu());
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async run() {
    OutputView.printHello();
    await this.getDate();
    await this.getMenus();
    OutputView.printMenu(this.#menuList.getMenuList());
    OutputView.printTotalAmount(this.#menuList.getTotalAmount());
  }
}

export default App;
