import Discount from "./Discount.js";
import { BADGE_PRICE, LEAST_AMOUNT } from "../constants/constant.js";

class Benefit {
  static getGiftMenu(menuList) {
    return menuList.getTotalAmount() >= 120000 ? "샴페인 1개" : "없음";
  }

  static getBenefitsDetail(date, menuList) {
    if (menuList.getTotalAmount() < LEAST_AMOUNT) return ["없음"];
    const benefitsDetail = [];
    Discount.addChristmasDiscount(benefitsDetail, date);
    Discount.addWeekendDiscount(benefitsDetail, date, menuList);
    Discount.addWeekdayDiscount(benefitsDetail, date, menuList);
    Discount.addSpecialDiscount(benefitsDetail, date);
    Discount.addEventGift(benefitsDetail, menuList);

    return benefitsDetail.length === 0 ? ["없음"] : benefitsDetail;
  }

  static getTotalBenefitAmount(date, menuList) {
    if (menuList.getTotalAmount() < LEAST_AMOUNT) return 0;
    let totalBenefitAmount = 0;
    totalBenefitAmount += Discount.getChristmasDiscountAmount(date);
    totalBenefitAmount += Discount.getWeekendDiscountAmount(date, menuList);
    totalBenefitAmount += Discount.getWeekdayDiscountAmount(date, menuList);
    totalBenefitAmount += Discount.getSpecialDiscountAmount(date);
    totalBenefitAmount += Discount.getEventGiftAmount(menuList);

    return totalBenefitAmount;
  }

  static getPredictAmount(date, menuList) {
    return this.getGiftMenu(menuList) === "샴페인 1개"
      ? menuList.getTotalAmount() - this.getTotalBenefitAmount(date, menuList) + 25000
      : menuList.getTotalAmount() - this.getTotalBenefitAmount(date, menuList);
  }

  static getEventBadge(date, menuList) {
    const totalBenefitAmount = this.getTotalBenefitAmount(date, menuList);
    if (totalBenefitAmount < BADGE_PRICE.star) return "없음";
    if (totalBenefitAmount >= BADGE_PRICE.star && totalBenefitAmount < BADGE_PRICE.tree) return "별";
    if (totalBenefitAmount >= BADGE_PRICE.tree && totalBenefitAmount < BADGE_PRICE.santa) return "트리";
    if (totalBenefitAmount >= BADGE_PRICE.santa) return "산타";
  }
}
export default Benefit;
