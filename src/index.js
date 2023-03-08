import Vue from './vue';

window.vm = new Vue({
  el: document.querySelector('#root'),
  data: {
    msg: 'default'
  }
});
