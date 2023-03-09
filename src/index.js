import Vue from './vue';

window.vm = new Vue({
  el: document.querySelector('#root'),
  data: {
    msg: 'default',
    arr: []
  }
});

const obj = {};

const proxyObj = new Proxy(obj, {
  get(target, key) {
    if (Reflect.ownKeys(obj).includes(key)) {
      // key 为 obj 自有属性，非原型链上的属性
      // 如果此值为对象类型，可以递归添加 Proxy
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    return Reflect.set(target, key, value);
  },
  deleteProperty(target, key) {
    return Reflect.deleteProperty(target, key);
  }
});
