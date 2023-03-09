export default class Dep {
  constructor() {
    this._subs = []; // 存放所有的 watcher
  }
  static target; // 临时存放注册中 watcher 实例
  addSub(sub) {
    this._subs.push(sub);
  }
  notify() {
    this._subs.forEach(sub => {
      sub.update();
    });
  }
}
