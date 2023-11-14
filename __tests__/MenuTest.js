import Menu from "../src/domain/Menu.js";

describe("Menu 클래스 테스트", () => {
  describe("메뉴 유효성 검사", () => {
    test("메뉴가 정상적인 경우", () => {
      const date = new Date(26);
      expect(date.getDate()).toEqual(26);
    });
  });
});
