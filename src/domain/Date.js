class Date {
  #theDate;

  constructor(input) {
    this.#validDate(input);
    this.#theDate = input;
  }
  #validDate(input) {}
}
export default Date;
