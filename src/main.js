import Vue from 'vue'
import App from './App.vue'
import { KswIcon } from "./index.js";
import "~/styles/icon.css";

Vue.config.productionTip = false

Vue.use(KswIcon);

new Vue({
  render: h => h(App),
}).$mount('#app')
