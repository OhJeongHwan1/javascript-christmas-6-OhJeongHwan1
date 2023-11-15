import MenuSlider from "../domain/MenuSlider.js";
import MenuList from "../domain/MenuList.js";
import Date from "../domain/Date.js";
import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";

class ChristmasPromotion {
  #date;
  #menuList;

  constructor() {
    this.#date = 0;
    this.#menuList = [];
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
        return new MenuList(await MenuSlider.getSlideMenu());
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async play() {
    OutputView.printHello();
    this.#date = await this.getDate();
    this.#menuList = await this.getMenus();
    OutputView.printPreviewText(this.#date);
    OutputView.printAllBenefit(this.#date, this.#menuList);
  }
}

export default ChristmasPromotion;
