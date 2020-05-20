import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';
import Petitions from './Petitions.vue';
import Petition from './Petition.vue';
import VueCookies from 'vue-cookies';
import VueImg from 'v-img'
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuetify);
Vue.use(VueCookies);
Vue.use(VueImg);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

// set default config
Vue.$cookies.config('7d');
// set global cookie
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');

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
