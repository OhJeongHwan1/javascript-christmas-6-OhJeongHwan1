import ChristmasPromotion from "./controller/ChristmasPromotion";

class App {
  async run() {
    const christmasPromotion = new ChristmasPromotion();
    await christmasPromotion.play();
  }
}

export default App;
