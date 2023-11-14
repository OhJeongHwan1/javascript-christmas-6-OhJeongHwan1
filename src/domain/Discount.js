import { WEEK, CHAMPAGNE_PRICE } from "../constants/constant.js";

class Discount {
  constructor() {}

  addChristmasDiscount(benefitsDetail, date) {
    if (date.getChristmasDiscount() !== 0) {
      benefitsDetail.push(`크리스마스 디데이 할인: -${date.getChristmasDiscount().toLocaleString("ko-KR")}원`);
    }
  }

  addWeekendDiscount(benefitsDetail, date, menuList) {
    if ((date.getDayOfWeek() === WEEK.friday || date.getDayOfWeek() === WEEK.saturday) && menuList.checkMainNumber() > 0) {
      benefitsDetail.push(`주말 할인: -${(menuList.checkMainNumber() * 2023).toLocaleString("ko-KR")}원`);
    }
  }

  addWeekdayDiscount(benefitsDetail, date, menuList) {
    if ((date.getDayOfWeek() >= WEEK.sunday || date.getDayOfWeek() === WEEK.thursday) && menuList.checkDessertNumber() > 0) {
      benefitsDetail.push(`평일 할인: -${(menuList.checkDessertNumber() * 2023).toLocaleString("ko-KR")}원`);
    }
  }

  addSpecialDiscount(benefitsDetail, date) {
    if (date.getSpecialDiscount() === 1000) {
      benefitsDetail.push(`특별 할인: -${date.getSpecialDiscount().toLocaleString("ko-KR")}원`);
    }
  }

  addEventGift(benefitsDetail, menuList) {
    if (menuList.getTotalAmount() >= 120000) {
      benefitsDetail.push(`증정 이벤트 -${CHAMPAGNE_PRICE.toLocaleString("ko-KR")}원`);
    }
  }

  getChristmasDiscountAmount(date) {
    return date.getChristmasDiscount();
  }

  getWeekendDiscountAmount(date, menuList) {
    return date.getDayOfWeek() === WEEK.friday || date.getDayOfWeek() === WEEK.saturday ? menuList.checkMainNumber() * 2023 : 0;
  }

  getWeekdayDiscountAmount(date, menuList) {
    return date.getDayOfWeek() >= WEEK.sunday || date.getDayOfWeek() === WEEK.thursday ? menuList.checkDessertNumber() * 2023 : 0;
  }

  getSpecialDiscountAmount(date) {
    return date.getSpecialDiscount();
  }

  getEventGiftAmount(menuList) {
    return menuList.getTotalAmount() >= 120000 ? CHAMPAGNE_PRICE : 0;
  }
}

export default Discount;
