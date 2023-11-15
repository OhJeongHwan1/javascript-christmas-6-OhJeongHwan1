import Menu from "../../src/domain/Menu.js";

describe("Menu 클래스 테스트", () => {
  describe("메뉴 유효성 검사", () => {
    test("메뉴가 정상적인 경우", () => {
      const menu = new Menu("양송이수프", 3);
      expect(menu.getName()).toEqual("양송이수프");
      expect(menu.getNumber()).toEqual(3);
    });
  });

  test.each([
    ["오정환", 1],
    ["", 1],
  ])("잘못된 메뉴 이름이 입력되었을 때 예외 처리", (name, number) => {
    expect(() => {
      new Menu(name, number);
    }).toThrow("[ERROR]");
  });

  test.each([
    ["양송이수프", 0],
    ["아이스크림", "a"],
  ])("잘못된 메뉴의 개수가 입력되었을 때 예외 처리", (name, number) => {
    expect(() => {
      new Menu(name, number);
    }).toThrow("[ERROR]");
  });

  describe("setPrice() 검사", () => {
    test.each([
      ["양송이수프", 3, 6000],
      ["티본스테이크", 1, 55000],
    ])("가격이 제대로 설정되는지 확인", (name, number, price) => {
      const menu = new Menu(name, number);
      expect(menu.getPrice()).toEqual(price);
    });
  });
});
