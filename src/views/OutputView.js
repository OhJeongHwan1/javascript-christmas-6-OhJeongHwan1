import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printHello() {
    Console.print(OUTPUT_MESSAGE.hello);
  },
  printPreviewText() {
    Console.print(OUTPUT_MESSAGE.previewText);
  },
  printMenu() {
    Console.print(OUTPUT_MESSAGE.menuTitle);
    // ...
    Console.print();
  },

  printTotalAmount() {
    Console.print(OUTPUT_MESSAGE.totalAmountTitle);
    // ...
    Console.print();
  },
  printGiftMenu() {
    Console.print(OUTPUT_MESSAGE.giftMenuTitle);
    // ...
    Console.print();
  },
  printBenefitsDetail() {
    Console.print(OUTPUT_MESSAGE.benefitsDetailTitle);
    // ...
    Console.print();
  },
  printTotalBenefitAmount() {
    Console.print(OUTPUT_MESSAGE.totalBenefitAmountTitle);
    // ...
    Console.print();
  },
  printPredictAmount() {
    Console.print(OUTPUT_MESSAGE.predictAmountTitle);
    // ...
    Console.print();
  },
  printEventBadge() {
    Console.print(OUTPUT_MESSAGE.eventBadgeTitle);
    // ...
  },
  // ...
};

export default OutputView;
