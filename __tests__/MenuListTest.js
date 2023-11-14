import MenuList from "../src/domain/MenuList.js";
import Menu from "../src/domain/Menu.js";

describe("MenuList 클래스 테스트", () => {
  describe("메뉴 리스트 유효성 검사", () => {
    test("메뉴 리스트가 정상적인 경우", () => {
      const menuList = new MenuList([
        new Menu("티본스테이크", 1),
        new Menu("바비큐립", 1),
        new Menu("초코케이크", 2),
        new Menu("제로콜라", 1),
      ]);
      expect(
        menuList.getMenuList().map((menu) => {
          return `${menu.getName()} ${menu.getNumber()}개`;
        }),
      ).toEqual(expect.arrayContaining(["티본스테이크 1개", "바비큐립 1개", "초코케이크 2개", "제로콜라 1개"]));
    });

    test("메뉴 총 개수가 20개가 초과화는 경우 예외처리", () => {
      expect(() => {
        new MenuList([new Menu("티본스테이크", 15), new Menu("바비큐립", 6)]);
      }).toThrow("[ERROR]");
    });

    test("중복 메뉴가 입력되었을 때 예외처리", () => {
      expect(() => {
        new MenuList([new Menu("티본스테이크", 1), new Menu("티본스테이크", 6)]);
      }).toThrow("[ERROR]");
    });

    test("음료만 입력되었을 때 예외처리", () => {
      expect(() => {
        new MenuList([new Menu("제로콜라", 1), new Menu("레드와인", 6), new Menu("샴페인", 2)]);
      }).toThrow("[ERROR]");
    });
  });

  describe("getTotalAmount() 함수 테스트", () => {
    test("메뉴 할인 전 총 금액 구하기", () => {
      const menuList = new MenuList([
        new Menu("양송이수프", 2),
        new Menu("티본스테이크", 1),
        new Menu("아이스크림", 2),
        new Menu("제로콜라", 1),
      ]);
      expect(menuList.getTotalAmount()).toEqual(80000);
    });
  });

  describe("checkDessertNumber() 함수 테스트", () => {
    test("디저트 메뉴 수 구하기", () => {
      const menuList = new MenuList([
        new Menu("양송이수프", 2),
        new Menu("티본스테이크", 1),
        new Menu("아이스크림", 2),
        new Menu("제로콜라", 1),
      ]);
      expect(menuList.checkDessertNumber()).toEqual(2);
    });
  });

  describe("checkMainNumber() 함수 테스트", () => {
    test("메인 메뉴 수 구하기", () => {
      const menuList = new MenuList([
        new Menu("양송이수프", 2),
        new Menu("티본스테이크", 1),
        new Menu("아이스크림", 2),
        new Menu("제로콜라", 1),
      ]);
      expect(menuList.checkMainNumber()).toEqual(1);
    });
  });
});
