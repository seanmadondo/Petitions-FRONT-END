<template>
  <div>
    <template>
      <div>
        List of all Petitions
        <br></br>
        <div v-if="errorFlag" style="color: red;">
          {{ error }}
        </div>
        <div id="petitions">
          <table>
            <tr v-for="petition in petitions">
              <td>{{ petition.title }}</td>
              <td>{{ petition.category }}</td>
              <td>{{ petition.authorName }}</td>
              <td>{{ petition.signatureCount}}</td>
              <br></br>
              <td><!--- view link here --></td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    data (){
      return{
        error: "",
        errorFlag: false,
        petitions: []
      }
    },
    mounted: function() {
      this.getPetitions();
    },
    methods: {
      getPetitions: function() {
        this.$http.get('http://localhost:4941/api/v1/petitions')
          .then((response) => {
            this.petitions = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      }
    }
  }
</script>


<style scoped>

</style>
