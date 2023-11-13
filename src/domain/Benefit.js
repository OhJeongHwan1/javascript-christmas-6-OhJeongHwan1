import { WEEK, CHAMPAGNE_PRICE } from "../constants/constant.js";

class Benefit {
  #overLeastAmount;

  constructor(menuList) {
    this.#overLeastAmount = menuList.getTotalAmount() >= 10000;
  }

  getGiftMenu(menuList) {
    if (menuList.getTotalAmount() >= 120000) {
      return "샴페인 1개";
    } else return "없음";
  }
  getBenefitsDetail(date, menuList) {
    if (this.#overLeastAmount === false) return ["없음"]; // 할인 전 총 주문 금액이 10000원 이하인 경우
    let benefitsDetail = [];
    if (date.getChristmasDiscount() !== 0) benefitsDetail.push(`크리스마스 디데이 할인: -${date.getChristmasDiscount().toLocaleString("ko-KR")}원`);
    if (date.getDayOfWeek() === WEEK.friday || date.getDayOfWeek() === WEEK.saturday)
      benefitsDetail.push(`주말 할인: -${(menuList.checkMainNumber() * 2023).toLocaleString("ko-KR")}원`);
    if (date.getDayOfWeek() >= WEEK.sunday || date.getDayOfWeek() === WEEK.thursday)
      benefitsDetail.push(`평일 할인: -${(menuList.checkDessertNumber() * 2023).toLocaleString("ko-KR")}원`);
    if (date.getSpecialDiscount() === 1000) benefitsDetail.push(`특별 할인: -${date.getSpecialDiscount().toLocaleString("ko-KR")}원`);
    if (menuList.getTotalAmount() >= 120000) benefitsDetail.push(`증정 이벤트 -${CHAMPAGNE_PRICE.toLocaleString("ko-KR")}원`);
    if (benefitsDetail.length === 0) return ["없음"];
    return benefitsDetail;
  }

  getTotalBenefitAmount(date, menuList) {
    if (this.#overLeastAmount === false) return 0; // 할인 전 총 주문 금액이 10000원 이하인 경우

    let totalBenefitAmount = 0;
    if (date.getChristmasDiscount() !== 0) totalBenefitAmount += date.getChristmasDiscount();
    if (date.getDayOfWeek() === WEEK.friday || date.getDayOfWeek() === WEEK.saturday) totalBenefitAmount += menuList.checkMainNumber() * 2023;
    if (date.getDayOfWeek() >= WEEK.sunday || date.getDayOfWeek() === WEEK.thursday) totalBenefitAmount += menuList.checkDessertNumber() * 2023;
    if (date.getSpecialDiscount() === 1000) totalBenefitAmount += date.getSpecialDiscount();
    if (menuList.getTotalAmount() >= 120000) totalBenefitAmount += CHAMPAGNE_PRICE;

    return totalBenefitAmount;
  }
}
export default Benefit;
