import MenuSlider from "./domain/MenuSlider.js";
import MenuList from "./domain/MenuList.js";
import { Console } from "@woowacourse/mission-utils";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    const menuslider = new MenuSlider();
    const list = new MenuList(await menuslider.getSlideMenu());
    OutputView.printMenu(list.getMenuList());
  }
}

export default App;
