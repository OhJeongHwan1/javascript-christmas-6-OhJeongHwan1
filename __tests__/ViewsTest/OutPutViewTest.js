import { MissionUtils } from "@woowacourse/mission-utils";
import OutputView from "../../src/views/OutputView.js";
import Date from "../../src/domain/Date.js";
import Menu from "../../src/domain/Menu.js";
import MenuList from "../../src/domain/MenuList.js";
import { ERROR_MESSAGE } from "../../src/constants/message.js";
import { EOL as LINE_SEPARATOR } from "os";

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

describe("출력 문구 테스트", () => {
  test("printHello() 테스트", () => {
    const logSpy = getLogSpy();
    OutputView.printHello();
    expect(logSpy).toHaveBeenCalledWith("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  });

  test("printPreviewText() 테스트", () => {
    const logSpy = getLogSpy();
    OutputView.printPreviewText(new Date(26));
    expect(logSpy).toHaveBeenCalledWith("12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n");
  });

  test("printErrorMessage() 테스트", () => {
    const logSpy = getLogSpy();
    OutputView.printErrorMessage(ERROR_MESSAGE.errorDate);
    expect(logSpy).toHaveBeenCalledWith("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  });

  test("printAllBenefit() 테스트", () => {
    const logSpy = getLogSpy();
    OutputView.printAllBenefit(
      new Date(3),
      new MenuList([new Menu("티본스테이크", 1), new Menu("바비큐립", 1), new Menu("초코케이크", 2), new Menu("제로콜라", 1)]),
    );

    const expected = [
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
