import MenuSlider from "../../src/domain/MenuSlider.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

describe("MenuSlider 클래스 테스트", () => {
  describe("checkMenuFormat()  테스트", () => {
    test.each(["티본스테이크=1", "티본스테이크1-", "티본스테이크 1개"])("메뉴 형식이 올바르지 않은 경우 예외 처리", (input) => {
      expect(() => {
        MenuSlider.checkMenuFormat(input);
      }).toThrow("[ERROR]");
    });
  });

  describe("메뉴 입력 테스트", () => {
    test("메뉴 입력이 정상적인 경우", async () => {
      mockQuestions(["티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);
      const menuList = await MenuSlider.getSlideMenu();

      expect(
        menuList.map((menu) => {
          return `${menu.getName()} ${menu.getNumber()}개`;
        }),
      ).toEqual(expect.arrayContaining(["티본스테이크 1개", "바비큐립 1개", "초코케이크 2개", "제로콜라 1개"]));
    });

    test("메뉴 입력이 유효하지 않은 경우", async () => {
      mockQuestions(["티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-"]);

      await expect(MenuSlider.getSlideMenu()).rejects.toThrow("[ERROR]");
    });
  });
});
