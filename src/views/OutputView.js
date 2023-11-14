import { Console } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGE } from "../constants/message.js";

const OutputView = {
  printHello() {
    Console.print(OUTPUT_MESSAGE.hello);
  },

  printPreviewText(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
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
    Console.print(`${totalAmount.toLocaleString("ko-KR")}원`);
    Console.print("");
  },

  printGiftMenu(giftMenu) {
    Console.print(OUTPUT_MESSAGE.giftMenuTitle);
    Console.print(giftMenu);
    Console.print("");
  },

  printBenefitsDetail(benefitsDetail) {
    Console.print(OUTPUT_MESSAGE.benefitsDetailTitle);
    benefitsDetail?.forEach((detail) => {
      Console.print(detail);
    });
    Console.print("");
  },

  printTotalBenefitAmount(totalBenefitAmount) {
    Console.print(OUTPUT_MESSAGE.totalBenefitAmountTitle);
    totalBenefitAmount === 0
      ? Console.print(`${totalBenefitAmount.toLocaleString("ko-KR")}원`)
      : Console.print(`-${totalBenefitAmount.toLocaleString("ko-KR")}원`);
    Console.print("");
  },

  printPredictAmount(predictAmount) {
    Console.print(OUTPUT_MESSAGE.predictAmountTitle);
    Console.print(`${predictAmount.toLocaleString("ko-KR")}원`);
    Console.print("");
  },

  printEventBadge(eventBadge) {
    Console.print(OUTPUT_MESSAGE.eventBadgeTitle);
    Console.print(eventBadge);
  },

  printAllBenefit(date, menuList, benefit) {
    this.printMenu(menuList.getMenuList());
    this.printTotalAmount(menuList.getTotalAmount());
    this.printGiftMenu(benefit.getGiftMenu(menuList));
    this.printBenefitsDetail(benefit.getBenefitsDetail(date, menuList));
    this.printTotalBenefitAmount(benefit.getTotalBenefitAmount(date, menuList));
    this.printPredictAmount(benefit.getPredictAmount(date, menuList));
    this.printEventBadge(benefit.getEventBadge(date, menuList));
  },
};

export default OutputView;
