import ChristmasPromotion from "./controller/ChristmasPromotion.js";

class App {
  async run() {
    const christmasPromotion = new ChristmasPromotion();
    await christmasPromotion.play();
  }
}

export default App;
