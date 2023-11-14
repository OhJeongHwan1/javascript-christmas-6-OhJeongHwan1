import MenuSlider from "./domain/MenuSlider.js";
import MenuList from "./domain/MenuList.js";
import Date from "./domain/Date.js";
import OutputView from "./views/OutputView.js";
import InputView from "./views/InputView.js";
import Benefit from "./domain/Benefit.js";

class App {
  #date;
  #menuList;
  #benefit;

  constructor() {
    this.#date = 0;
    this.#menuList = [];
    this.#benefit = null;
  }
  async getDate() {
    while (true) {
      try {
        const inputDate = await InputView.readDate();
        return new Date(Number(inputDate));
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
  async getMenus() {
    while (true) {
      try {
        const menuslider = new MenuSlider();
        return new MenuList(await menuslider.getSlideMenu());
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async run() {
    OutputView.printHello();
    this.#date = await this.getDate();
    this.#menuList = await this.getMenus();
    OutputView.printPreviewText(this.#date);
    this.#benefit = new Benefit(this.#menuList);
    OutputView.printAllBenefit(this.#date, this.#menuList, this.#benefit);
  }
}

export default App;
