import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import Petition from './Petition.vue';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import VueImg from 'v-img'
Vue.use(VueImg)

//Vuetify CSS
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);


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
