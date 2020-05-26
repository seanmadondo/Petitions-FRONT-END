import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import Petition from './Petition.vue';
import Account from './Account.vue';

import VueImg from 'v-img'
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
//import Cookies from 'js-cookie';
//Vue.use(Cookies);

Vue.use(Vuetify);
// Vue.use(VueCookies);
Vue.use(VueImg);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);



// import VueResource from 'vue-resource';
// Vue.use(VueResource);

//Vue.http.options.emulateJSON = true;

// store a list of the routes that app will use.
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/petitions/:petition_id",
    name: "petition",
    component: Petition
  },
  {
    path: "/petitions",
    name: "petitions",
    component: Petitions
  },

  {
    path: "/account",
    name: "account",
    component: Account
  }
];


//Get newly created routes added to application
const router = new VueRouter({
  routes: routes,
  mode: 'history'
});


new Vue({
  el: '#app',
  vuetify : new Vuetify(),
  router: router,
  render: h => h(App)
});
