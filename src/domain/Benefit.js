import { WEEK } from "../constants/constant.js";

class Benefit {
  #overLeastAmount;

  constructor(menuList) {
    if (menuList.getTotalAmount() >= 10000) this.#overLeastAmount = true;
    if (menuList.getTotalAmount() < 10000) this.#overLeastAmount = false;
  }

  getGiftMenu(menuList) {
    if (menuList.getTotalAmount() >= 120000) {
      return "샴페인 1개";
    } else return "없음";
  }
  getBenefitsDetail(date, menuList) {
    if (this.#overLeastAmount === false) return ["없음"];

    let benefitsDetail = [];
    if (date.getChristmasDiscount() !== 0) benefitsDetail.push(`크리스마스 디데이 할인: -${date.getChristmasDiscount()}원`);
    if (date.getDayOfWeek() === WEEK.friday || date.getDayOfWeek() === WEEK.saturday)
      benefitsDetail.push(`주말 할인: -${menuList.checkMainNumber() * 2023}원`);
    if (date.getDayOfWeek() >= WEEK.sunday || date.getDayOfWeek() === WEEK.thursday)
      benefitsDetail.push(`평일 할인: -${menuList.checkDessertNumber() * 2023}원`);
    if (benefitsDetail.length === 0) return ["없음"];
    return benefitsDetail;
  }
}
export default Benefit;
