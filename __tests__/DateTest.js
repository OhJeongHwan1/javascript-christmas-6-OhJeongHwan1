import Date from "../src/domain/Date.js";
import { WEEK } from "../src/constants/constant.js";

describe("Date 클래스 테스트", () => {
  describe("방문 날짜 유효성 검사", () => {
    test("방문 날짜가 정상적인 경우", () => {
      const date = new Date(26);
      expect(date.getDate()).toEqual(26);
    });

    test.each([32, 0])("방문 날짜가 1~31일을 벗어나는 경우 예외 처리", (input) => {
      expect(() => {
        const date = new Date(input);
        date.getDate();
      }).toThrow("[ERROR]");
    });

    test.each(["정환", "-"])("방문 날짜가 숫자가 아닌 경우 예외 처리", (input) => {
      expect(() => {
        const date = new Date(input);
        date.getDate();
      }).toThrow("[ERROR]");
    });

    test.each([1.1, 20.5])("방문 날짜가 1~31 사이지만 정수가 아닌 경우 예외 처리", (input) => {
      expect(() => {
        const date = new Date(input);
        date.getDate();
      }).toThrow("[ERROR]");
    });

    test("방문 날짜를 입력하지 않는 경우 0으로 변환되어 예외 처리", () => {
      expect(() => {
        const date = new Date(0);
        date.getDate();
      }).toThrow("[ERROR]");
    });
  });

  describe("getChristmasDiscount() 테스트: 크리스마스 디데이 할인 금액 반환", () => {
    test.each([
      [1, 1000],
      [16, 2500],
      [25, 3400],
    ])("크리스마스 디데이 할인 기간에 방문한 경우 할인 금액", (input, expectResult) => {
      const date = new Date(input);
      expect(date.getChristmasDiscount()).toEqual(expectResult);
    });

    test.each([
      [26, 0],
      [31, 0],
    ])("크리스마스 디데이 할인 기간이 끝난 경우 할인 금액 없음", (input, expectResult) => {
      const date = new Date(input);
      expect(date.getChristmasDiscount()).toEqual(expectResult);
    });
  });

  describe("getSpecialDiscount() 테스트: 별이 있는 날짜 할인 금액 반환", () => {
    test.each([
      [3, 1000],
      [17, 1000],
      [25, 1000],
    ])("별이 있는 날짜 할인 금액 1000원", (input, expectResult) => {
      const date = new Date(input);
      expect(date.getSpecialDiscount()).toEqual(expectResult);
    });

    test.each([
      [26, 0],
      [30, 0],
    ])("별이 없는 날짜 할인 금액 없음", (input, expectResult) => {
      const date = new Date(input);
      expect(date.getSpecialDiscount()).toEqual(expectResult);
    });
  });

  describe("getDayOfWeek() 테스트: 요일 반환", () => {
    test.each([
      [1, WEEK.friday],
      [2, WEEK.saturday],
      [3, WEEK.sunday],
      [4, WEEK.monday],
      [5, WEEK.tuesday],
      [6, WEEK.wednesday],
      [7, WEEK.thursday],
    ])("날짜별 요일 구하기", (input, expectResult) => {
      const date = new Date(input);
      expect(date.getDayOfWeek()).toEqual(expectResult);
    });
  });
});
