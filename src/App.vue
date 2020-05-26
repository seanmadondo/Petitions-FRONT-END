<template>

  <div id="app" style="overflow: hidden">
    <h1 class="title" style="color:White" > iPetition UC </h1>
    <div class="navbar"></div>
    <v-app-bar>
      <v-tabs centered>
        <v-tab :to="{ name: 'home' }"> <h4> <a> <router-link :to="{ name: 'home' }" > <span class="material-icons">home</span> </router-link></a> </h4> </v-tab>
        <v-tab :to="{ name: 'petitions'}"> <h4> <a> <router-link :to="{ name: 'petitions'}"> <span class="material-icons"> assignment </span> </router-link> </a> </h4> </v-tab>
        <v-tab :to="{ name: 'account'}"> <h4> <a> <router-link :to="{ name: 'account'}"> <span class="material-icons"> account_circle </span> </router-link> </a> </h4> </v-tab>
      </v-tabs>
    </v-app-bar>
    <router-view></router-view>
  </div>

</template>

<script>
  import Home from './Home.vue';
  export default {
    components: {
      'app-home':Home
    }
  }

</script>

<style scoped>

  h1 {
    font-size: 20px;
    padding-left: 50px;
    padding-top: 1px;
    font-family: "Times New Roman", Georgia, serif;
    font-weight: 900;
  }




  .navbar {
    background-color: midnightblue;
    position: absolute; /* Set the nav bar to fixed position */
    top: 0; /* Position the nav bar at the top of the page */
    width: 100%;
    padding-bottom: 118px;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    border-radius: 0px 0px 5px 5px;
    display: inline-block;
    z-index: -1;

  }

  body {
    background-color: lightblue;
  }


</style>
