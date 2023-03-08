import Observer from './observer';
import Compiler from './compiler';

export default class Vue {
  constructor({ el, data }) {
    this.$el = el;
    this.$data = data;
    // 将 data 里的变量挂载到实例上
    this._attachData();
    // 给 data 添加响应式
    new Observer(this.$data);
    // 解析模板
    new Compiler(this);
  }
  _attachData() {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newValue) {
          this.$data[key] = newValue;
        }
      });
    });
  }
}
