import Vue from './vue2/vue';

window.vm = new Vue({
  el: document.querySelector('#root'),
  data: {
    msg: 'default',
    arr: []
  }
});
