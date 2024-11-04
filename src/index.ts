import BCHTool from './components/BCHTool.vue';

export default {
  install (app, options = {}) {
    app.component('BCHTool', BCHTool);
  }
}
