export class BaristaService {
  static #list: Array<string> = [];
  static #isMaking = false;

  static insertOrder(menu: string) {
    this.#list.push(menu);
  }

  static shiftOrder() {
    return this.#list.shift();
  }

  static currentBaristaWorkState() {
    return this.#isMaking;
  }

  static getOrderList() {
    return this.#list;
  }

  static setWorkBarista() {
    this.#isMaking = !this.#isMaking;
  }
}
