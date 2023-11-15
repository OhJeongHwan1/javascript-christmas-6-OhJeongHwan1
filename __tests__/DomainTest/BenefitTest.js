import Benefit from "../../src/domain/Benefit.js";
import Date from "../../src/domain/Date.js";
import MenuList from "../../src/domain/MenuList.js";
import Menu from "../../src/domain/Menu.js";

const EXAMPLE_MENU_LIST_1 = [
  new Menu("티본스테이크", 1),
  new Menu("바비큐립", 1),
  new Menu("초코케이크", 2),
  new Menu("제로콜라", 1),
]; //총 혜택 금액:31,246원

const EXAMPLE_MENU_LIST_2 = [new Menu("타파스", 1), new Menu("제로콜라", 1)]; //총 혜택 금액 0원

const EXAMPLE_MENU_LIST_3 = [new Menu("티본스테이크", 2), new Menu("제로콜라", 1)]; //총 혜택 금액 5,146원

const EXAMPLE_MENU_LIST_4 = [new Menu("초코케이크", 4)]; // 총 혜택 금액 :12,492원

describe("Benefit 클래스 테스트", () => {
  describe("getGiftMenu() 테스트", () => {
    test("할인 전 총 금액이 120000원 이상이므로 샴페인 증정", () => {
      const giftMenu = Benefit.getGiftMenu(new MenuList(EXAMPLE_MENU_LIST_1));

      expect(giftMenu).toEqual("샴페인 1개");
    });

    test("할인 전 총 금액이 120000원 미만이므로 증정 메뉴 없음", () => {
      const giftMenu = Benefit.getGiftMenu(new MenuList(EXAMPLE_MENU_LIST_2));

      expect(giftMenu).toEqual("없음");
    });
  });

  describe("getBenefitsDetail() 테스트", () => {
    test("혜택 내역: 크리스마스 디데이 할인, 평일 할인, 특별 할인, 증정 이벤트", () => {
      const benefitsDetail = Benefit.getBenefitsDetail(new Date(3), new MenuList(EXAMPLE_MENU_LIST_1));
      const resultList = [
        "크리스마스 디데이 할인: -1,200원",
        "평일 할인: -4,046원",
        "특별 할인: -1,000원",
        "증정 이벤트: -25,000원",
      ];

      benefitsDetail.forEach((detail, index) => {
        expect(detail).toEqual(resultList[index]);
      });
    });

    test("날짜는 25일,할인 전 총 금액은 10000원 미만인 경우 혜택 내역: 없음", () => {
      const benefitsDetail = Benefit.getBenefitsDetail(new Date(25), new MenuList(EXAMPLE_MENU_LIST_2));

      expect(benefitsDetail[0]).toEqual("없음");
    });

    test("혜택 내역: 없음", () => {
      const benefitsDetail = Benefit.getBenefitsDetail(new Date(26), new MenuList(EXAMPLE_MENU_LIST_2));

      expect(benefitsDetail[0]).toEqual("없음");
    });
  });

  describe("getTotalBenefitAmount() 테스트", () => {
    test("총 혜택 금액 구하기", () => {
      const totalBenefitAmount = Benefit.getTotalBenefitAmount(new Date(3), new MenuList(EXAMPLE_MENU_LIST_1));

      expect(totalBenefitAmount).toEqual(31246);
    });

    test("날짜는 25일,할인 전 총 금액은 10000원 미만인 경우 총 혜택 금액은 0원", () => {
      const totalBenefitAmount = Benefit.getTotalBenefitAmount(new Date(25), new MenuList(EXAMPLE_MENU_LIST_2));

      expect(totalBenefitAmount).toEqual(0);
    });
  });

  describe("getPredictAmount() 테스트", () => {
    test("할인 후 예상 금액 구하기", () => {
      const predictAmount = Benefit.getPredictAmount(new Date(3), new MenuList(EXAMPLE_MENU_LIST_1));

      expect(predictAmount).toEqual(135754);
    });
  });

  describe("getEventBadge() 테스트", () => {
    test("총 혜택 금액 20,000원 이상으로 산타 뱃지 받기", () => {
      const eventBadge = Benefit.getEventBadge(new Date(3), new MenuList(EXAMPLE_MENU_LIST_1));

      expect(eventBadge).toEqual("산타");
    });

    test("총 혜택 금액 10000원 이상 20000원 미만으로 트리 뱃지 받기", () => {
      const eventBadge = Benefit.getEventBadge(new Date(25), new MenuList(EXAMPLE_MENU_LIST_4));

      expect(eventBadge).toEqual("트리");
    });

    test("총 혜택 금액 5000원 이상 10000원 미만으로 별 뱃지 받기", () => {
      const eventBadge = Benefit.getEventBadge(new Date(2), new MenuList(EXAMPLE_MENU_LIST_3));

      expect(eventBadge).toEqual("별");
    });

    test("총 혜택 금액 5000원 미만으로 이벤트 뱃지 없음", () => {
      const eventBadge = Benefit.getEventBadge(new Date(26), new MenuList(EXAMPLE_MENU_LIST_2));

      expect(eventBadge).toEqual("없음");
    });
  });
});
