import Dep from './dep';

export default class Watcher {
  constructor(vm, key, cb) {
    this.$vm = vm;
    this.$key = key;
    this.$cb = cb;
    // 存储此次 watcher 实例，并将后续 observer.get 动作标记为模板解析操作
    Dep.target = this;
    // 触发对应的 observer.get 方法
    vm[key];
    // 清理临时存储，释放模板解析标记
    Dep.target = null;
  }
  update() {
    // 将新值发送到页面
    this.$cb(this.$vm[this.$key]);
  }
}
