import Discount from "../src/domain/Discount.js";
import Date from "../src/domain/Date.js";
import Menu from "../src/domain/Menu.js";
import MenuList from "../src/domain/MenuList.js";

const EXAMPLE_MENU_LIST = [
  new Menu("티본스테이크", 1),
  new Menu("바비큐립", 1),
  new Menu("초코케이크", 2),
  new Menu("제로콜라", 1),
];

describe("Discount 클래스 테스트", () => {
  describe("배열에 출력값 추가해주는 함수들 테스트", () => {
    test("addChristmasDiscount() 테스트: 배열에 크리스마스 디데이 할인 추가", () => {
      const array = [];
      Discount.addChristmasDiscount(array, new Date(25));

      expect(array[0]).toEqual(`크리스마스 디데이 할인: -3,400원`);
    });

    test("addWeekendDiscount() 테스트: 배열에 주말 할인 추가", () => {
      const array = [];
      Discount.addWeekendDiscount(array, new Date(2), new MenuList(EXAMPLE_MENU_LIST));

      expect(array[0]).toEqual(`주말 할인: -4,046원`);
    });

    test("addWeekdayDiscount() 테스트: 배열에 평일 할인 추가", () => {
      const array = [];
      Discount.addWeekdayDiscount(array, new Date(3), new MenuList(EXAMPLE_MENU_LIST));

      expect(array[0]).toEqual(`평일 할인: -4,046원`);
    });

    test("addSpecialDiscount() 테스트: 배열에 특별 할인 추가", () => {
      const array = [];
      Discount.addSpecialDiscount(array, new Date(25));

      expect(array[0]).toEqual(`특별 할인: -1,000원`);
    });

    test("addEventGift() 테스트: 배열에 증정 이벤트추가", () => {
      const array = [];
      Discount.addEventGift(array, new MenuList(EXAMPLE_MENU_LIST));

      expect(array[0]).toEqual(`증정 이벤트: -25,000원`);
    });
  });

  describe("할인 금액 반환해주는 함수들 테스트", () => {
    test("getChristmasDiscountAmount() 테스트: 크리스마스 디데이 할인 금액 반환", () => {
      const cost = Discount.getChristmasDiscountAmount(new Date(25));

      expect(cost).toEqual(3400);
    });

    test("getWeekendDiscountAmount() 테스트: 주말 할인 금액 반환", () => {
      const cost = Discount.getWeekendDiscountAmount(new Date(2), new MenuList(EXAMPLE_MENU_LIST));

      expect(cost).toEqual(4046);
    });

    test("getWeekdayDiscountAmount() 테스트: 평일 할인 금액 반환", () => {
      const cost = Discount.getWeekdayDiscountAmount(new Date(3), new MenuList(EXAMPLE_MENU_LIST));

      expect(cost).toEqual(4046);
    });

    test("getSpecialDiscountAmount() 테스트: 특별 할인 금액 반환", () => {
      const cost = Discount.getSpecialDiscountAmount(new Date(25));

      expect(cost).toEqual(1000);
    });

    test("getEventGiftAmount() 테스트: 배열에 증정 이벤트추가", () => {
      const cost = Discount.getEventGiftAmount(new MenuList(EXAMPLE_MENU_LIST));

      expect(cost).toEqual(25000);
    });
  });
});
