import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE } from "../constants/message.js";

const OutputView = {
  printHello() {
    Console.print(OUTPUT_MESSAGE.hello);
  },
  printPreviewText() {
    Console.print(OUTPUT_MESSAGE.previewText);
  },
  printErrorMessage(error) {
    Console.print(error);
  },
  printMenu(menuList) {
    Console.print("");
    Console.print(OUTPUT_MESSAGE.menuTitle);
    menuList.forEach((menu) => {
      Console.print(`${menu.getName()} ${menu.getNumber()}개`);
    });
    Console.print("");
  },

  printTotalAmount(totalAmount) {
    Console.print(OUTPUT_MESSAGE.totalAmountTitle);
    Console.print(`${totalAmount}원`);
    Console.print("");
  },
  printGiftMenu() {
    Console.print(OUTPUT_MESSAGE.giftMenuTitle);
    // ...
    Console.print("");
  },
  printBenefitsDetail() {
    Console.print(OUTPUT_MESSAGE.benefitsDetailTitle);
    // ...
    Console.print("");
  },
  printTotalBenefitAmount() {
    Console.print(OUTPUT_MESSAGE.totalBenefitAmountTitle);
    // ...
    Console.print("");
  },
  printPredictAmount() {
    Console.print(OUTPUT_MESSAGE.predictAmountTitle);
    // ...
    Console.print("");
  },
  printEventBadge() {
    Console.print(OUTPUT_MESSAGE.eventBadgeTitle);
    // ...
  },
  // ...
};

export default OutputView;
