<template>

  <div id="app" style="overflow: hidden">
    <h1 class="title" style="color:White" > PetitionHub </h1>

    <div class="navbar"></div>
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
    font-size: 30px;
    padding-left: 50px;
    padding-top: 25px;
    font-family: "Times New Roman", Georgia, serif;
    font-weight: 900;
  }


  .navbar {
    background-color: steelblue;
    position: absolute; /* Set the nav bar to fixed position */
    top: 0; /* Position the nav bar at the top of the page */
    width: 100%;
    padding-bottom: 120px;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    border-radius: 0px 0px 5px 5px;
    display: inline-block;
    z-index: -1;

  }


</style>
