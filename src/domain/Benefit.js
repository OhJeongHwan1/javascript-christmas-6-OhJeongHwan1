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

    return benefitsDetail;
  }
}
export default Benefit;
