# mine-vue-reactivity

vue 双向绑定部分源码解析

**`Proxy` 代理 / `Reflect` 映射**

> vue3 中，使用 `Proxy` 替换了原来的 `Object.defineProperty()` 方法

```javascript
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
```

操作包装后的 `proxyObj` 对象可以触发拦截器，而原对象 `obj` 不会被影响。

`Proxy` 对比 `Object.defineProperty()` 的优点：

1. 可监听 `新增/删除` 操作
2. 原生支持对 `数组` 的代理
