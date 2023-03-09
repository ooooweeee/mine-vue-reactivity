import Watcher from './watcher';

const reg = /\{\{(.+?)\}\}/;

export default class Compiler {
  constructor(vm) {
    this.$vm = vm;
    this.$el = vm.$el;
    this.compile(this.$el);
  }
  compile(el) {
    Array.from(el.childNodes).forEach(node => {
      this.compileText(node);
    });
  }
  compileText(textNode) {
    const [, _key] = textNode.textContent.match(reg) || [];
    if (!_key) {
      return;
    }
    const key = _key.trim();
    const tmp = this.$vm[key];
    if (!tmp) {
      return;
    }
    textNode.textContent = JSON.stringify(tmp);
    // 该值需要响应式渲染，需要为其添加观察者
    new Watcher(this.$vm, key, newValue => {
      // 值发生改变时，更新 DOM
      textNode.textContent = JSON.stringify(newValue);
    });
  }
}
