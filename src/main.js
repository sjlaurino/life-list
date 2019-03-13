import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  Moment,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
