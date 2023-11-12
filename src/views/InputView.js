import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE } from "../constants/message.js";

const InputView = {
  async readDate() {
    return await Console.readLineAsync(INPUT_MESSAGE.getDate);
  },

  async readMenu() {
    return await Console.readLineAsync(INPUT_MESSAGE.getMenu);
  },
};

export default InputView;
