import ChristmasPromotion from "../../src/controller/ChristmasPromotion";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

describe("ChristmasPromotion 클래스 테스트", () => {
  describe("inputDate(): 방문 날짜 입력 테스트", () => {
    test("방문 날짜 입력이 정상적인 경우", async () => {
      mockQuestions(["25"]);
      const christmasPromotion = new ChristmasPromotion();
      const date = await christmasPromotion.inputDate();

      expect(date.getDate()).toEqual(25);
    });

    test("방문 날짜 입력이 유효하지 않은 경우 정상적인 값을 받을 때까지 입력", async () => {
      const logSpy = getLogSpy();
      mockQuestions(["32", "0", "25"]);
      const christmasPromotion = new ChristmasPromotion();
      const date = await christmasPromotion.inputDate();

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
      expect(date.getDate()).toEqual(25);
    });
  });

  describe("inputMenus(): 메뉴 입력 테스트", () => {
    test("메뉴 입력이 정상적인 경우", async () => {
      mockQuestions(["타파스-1,제로콜라-1"]);
      const christmasPromotion = new ChristmasPromotion();
      const menuList = await christmasPromotion.inputMenus();

      expect(
        menuList.getMenuList().map((menu) => {
          return `${menu.getName()} ${menu.getNumber()}개`;
        }),
      ).toEqual(expect.arrayContaining(["타파스 1개", "제로콜라 1개"]));
    });

    test("메뉴 입력이 유효하지 않은 경우 정상적인 값을 받을 때까지 입력", async () => {
      const logSpy = getLogSpy();
      mockQuestions(["타파스-1,제로콜라=1", "타파스-1,제로콜라-a", "타파스-1,제로콜라-1"]);
      const christmasPromotion = new ChristmasPromotion();
      const menuList = await christmasPromotion.inputMenus();

      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR]"));
      expect(
        menuList.getMenuList().map((menu) => {
          return `${menu.getName()} ${menu.getNumber()}개`;
        }),
      ).toEqual(expect.arrayContaining(["타파스 1개", "제로콜라 1개"]));
    });
  });

  describe("play(): 크리스마스 프로모션 테스트", () => {
    describe("방문 날짜와 메뉴 정상 입력", () => {
      test("26일 방문, 타파스 1개, 제로콜라 1개 주문", async () => {
        mockQuestions(["26", "타파스-1,제로콜라-1"]);
        const logSpy = getLogSpy();
        const christmasPromotion = new ChristmasPromotion();
        await christmasPromotion.play();

        const expected = [
          "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
          "12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
          "<주문 메뉴>",
          "타파스 1개",
          "제로콜라 1개",
          "<할인 전 총주문 금액>",
          "8,500원",
          "<증정 메뉴>",
          "없음",
          "<혜택 내역>",
          "없음",
          "<총혜택 금액>",
          "0원",
          "<할인 후 예상 결제 금액>",
          "8,500원",
          "<12월 이벤트 배지>",
          "없음",
        ];

        expectLogContains(getOutput(logSpy), expected);
      });

      test("3일 방문, 티본스테이크 1개, 바비큐립 1개, 초코케이크 2개, 제로콜라 1개 주문", async () => {
        mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);
        const logSpy = getLogSpy();
        const christmasPromotion = new ChristmasPromotion();
        await christmasPromotion.play();

        const expected = [
          "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
          "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
          "<주문 메뉴>",
          "티본스테이크 1개",
          "바비큐립 1개",
          "초코케이크 2개",
          "제로콜라 1개",
          "<할인 전 총주문 금액>",
          "142,000원",
          "<증정 메뉴>",
          "샴페인 1개",
          "<혜택 내역>",
          "크리스마스 디데이 할인: -1,200원",
          "평일 할인: -4,046원",
          "특별 할인: -1,000원",
          "증정 이벤트: -25,000원",
          "<총혜택 금액>",
          "-31,246원",
          "<할인 후 예상 결제 금액>",
          "135,754원",
          "<12월 이벤트 배지>",
          "산타",
        ];

        expectLogContains(getOutput(logSpy), expected);
      });
    });
    describe("유효하지 않은 입력", () => {
      test("유효하지 않은 방문 날짜를 입력했을 때 예외 테스트", async () => {
        const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
        const INPUTS_TO_END = ["1", "해산물파스타-2"];
        const logSpy = getLogSpy();
        mockQuestions(["a", ...INPUTS_TO_END]);

        const christmasPromotion = new ChristmasPromotion();
        await christmasPromotion.play();

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
      });

      test("유효하지 않은 메뉴를 입력했을 때 예외 테스트", async () => {
        const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
        const INPUTS_TO_END = ["해산물파스타-2"];
        const logSpy = getLogSpy();
        mockQuestions(["3", "제로콜라-a", ...INPUTS_TO_END]);

        const christmasPromotion = new ChristmasPromotion();
        await christmasPromotion.play();

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
      });
    });
  });
});
