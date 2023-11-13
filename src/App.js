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
        this.#date = new Date(Number(await InputView.readDate()));
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
    OutputView.printPreviewText(this.#date.getDate());
    this.#benefit = new Benefit(this.#menuList);
    OutputView.printMenu(this.#menuList.getMenuList());
    OutputView.printTotalAmount(this.#menuList.getTotalAmount());
    OutputView.printGiftMenu(this.#benefit.getGiftMenu(this.#menuList));
    OutputView.printBenefitsDetail(this.#benefit.getBenefitsDetail(this.#date, this.#menuList));
    OutputView.printTotalBenefitAmount(this.#benefit.getTotalBenefitAmount(this.#date, this.#menuList));
  }
}

export default App;
