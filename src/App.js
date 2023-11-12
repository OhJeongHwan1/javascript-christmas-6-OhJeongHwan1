import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    await InputView.readDate();
    await InputView.readMenu();
  }
}

export default App;
