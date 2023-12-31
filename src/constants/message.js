export const INPUT_MESSAGE = {
  getDate: "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  getMenu: "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
};

export const OUTPUT_MESSAGE = {
  hello: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  menuTitle: "<주문 메뉴>",
  totalAmountTitle: "<할인 전 총주문 금액>",
  giftMenuTitle: "<증정 메뉴>",
  benefitsDetailTitle: "<혜택 내역>",
  totalBenefitAmountTitle: "<총혜택 금액>",
  predictAmountTitle: "<할인 후 예상 결제 금액>",
  eventBadgeTitle: "<12월 이벤트 배지>",
};

export const ERROR_MESSAGE = {
  errorDate: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  errorMenu: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
  exceedMenu: "[ERROR] 메뉴는 한 번에 최대 20개 까지만 주문할 수 있습니다.",
  onlyBeverage: "[ERROR] 음료만 주문할 수 없습니다.",
};
