import Dep from './dep';

const arrProxyProto = Object.create(Array.prototype);

export default class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, value) {
    const dep = new Dep();
    if (Object.prototype.toString.call(value) === '[object Array]') {
      ['push', 'pop', 'shift', 'unshift'].forEach(method => {
        arrProxyProto[method] = function () {
          Array.prototype[method].call(this, ...arguments);
          dep.notify();
        };
      });
      value.__proto__ = arrProxyProto;
    }
    // defineProperty 方法无法在 ES5 中 shim，所以不支持 IE8 及以下的浏览器
    Object.defineProperty(obj, key, {
      get() {
        // 依赖收集
        if (Dep.target) {
          // 此次触发来自于模板解析，收集其对应的 watcher
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newValue) {
        if (newValue === value) {
          return;
        }
        value = newValue;
        // 通知视图更新
        dep.notify();
      }
    });
  }
}
