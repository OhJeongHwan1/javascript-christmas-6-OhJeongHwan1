import Discount from "./Discount.js";
import { BADGE_PRICE } from "../constants/constant.js";

class Benefit {
  #overLeastAmount;

  constructor(menuList) {
    this.#overLeastAmount = menuList.getTotalAmount() >= 10000;
  }

  getGiftMenu(menuList) {
    return menuList.getTotalAmount() >= 120000 ? "샴페인 1개" : "없음";
  }
  getBenefitsDetail(date, menuList) {
    if (!this.#overLeastAmount) return ["없음"];
    const discount = new Discount();
    const benefitsDetail = [];
    discount.addChristmasDiscount(benefitsDetail, date);
    discount.addWeekendDiscount(benefitsDetail, date, menuList);
    discount.addWeekdayDiscount(benefitsDetail, date, menuList);
    discount.addSpecialDiscount(benefitsDetail, date);
    discount.addEventGift(benefitsDetail, menuList);

    return benefitsDetail.length === 0 ? ["없음"] : benefitsDetail;
  }

  getTotalBenefitAmount(date, menuList) {
    if (!this.#overLeastAmount) return 0;
    const discount = new Discount();
    let totalBenefitAmount = 0;
    totalBenefitAmount += discount.getChristmasDiscountAmount(date);
    totalBenefitAmount += discount.getWeekendDiscountAmount(date, menuList);
    totalBenefitAmount += discount.getWeekdayDiscountAmount(date, menuList);
    totalBenefitAmount += discount.getSpecialDiscountAmount(date);
    totalBenefitAmount += discount.getEventGiftAmount(menuList);

    return totalBenefitAmount;
  }

  getPredictAmount(date, menuList) {
    return this.getGiftMenu(menuList) === "샴페인 1개"
      ? menuList.getTotalAmount() - this.getTotalBenefitAmount(date, menuList) + 25000
      : menuList.getTotalAmount() - this.getTotalBenefitAmount(date, menuList);
  }

  getEventBadge(date, menuList) {
    const totalBenefitAmount = this.getTotalBenefitAmount(date, menuList);
    if (totalBenefitAmount < BADGE_PRICE.star) return "없음";
    if (totalBenefitAmount >= BADGE_PRICE.star && totalBenefitAmount < BADGE_PRICE.tree) return "별";
    if (totalBenefitAmount >= BADGE_PRICE.tree && totalBenefitAmount < BADGE_PRICE.santa) return "트리";
    if (totalBenefitAmount >= BADGE_PRICE.santa) return "산타";
  }
}
export default Benefit;
