import Vue from 'vue'
import App from './App.vue'
import { KrpomIcon } from "./index.js";
import "~/styles/icon.css";
import "~/tailwindcss.css";

Vue.config.productionTip = false

Vue.use(KrpomIcon);

new Vue({
  render: h => h(App),
}).$mount('#app')
