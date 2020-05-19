<template>
  <div>

    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <!-- Display a single petition-->
    <div v-if="$route.params.petition_id">
      <div id="petition">
        <router-link :to="{ name: 'petitions' }"> Back to Petitions </router-link>
        <br /><br />

        <table>
          <tr> <td>Petition Title <br/> {{ onePetition.title }}  </td></tr>
          <br/>
          <tr> <td>Petition Description <br/> {{ onePetition.description }} </td></tr>
          <br/>
          <tr> <td>Petition Author <br/>{{ onePetition.authorName }} </td></tr>
          <br/>
          <tr> <td>City <br/>{{ onePetition.authorCity }} </td></tr>
          <br/>
          <tr> <td>Country <br/> {{ onePetition.authorCountry }} </td></tr>
          <br/>
          <tr> <td>Number of Signatures <br/> {{ onePetition.signatureCount }} </td></tr>
          <br/>
          <tr> <td>Category <br/>{{ onePetition.category }} </td></tr>
          <br/>
          <tr> <td>Created Date <br/> {{ onePetition.createdDate }} </td></tr>
          <br/>
          <tr> <td>Closing Date <br/>{{ onePetition.closingDate }} </td></tr>
          <br/>

        </table>

        Signatures
        <tr v-for="signature in petitionSignatures">
          <td> {{signature.name }}</td>
          <td> {{ signature.city }}</td>
          <td> {{signature.country }}</td>
          <td> {{signature.signedDate }}</td>
          <br/>
        </tr>


      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data (){
      return{
        error: "",
        errorFlag: false,
        onePetition: [],
        petitionSignatures: []
      }
    },
    mounted: function() {
      this.getOnePetition(this.$route.params.petition_id);
      this.getPetitionSignatures(this.$route.params.petition_id);
    },
    methods: {
      //Get a single petition from the database
      getOnePetition: function(id) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + id)
          .then((response) => {
            this.onePetition = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      //Get the list of signatures for the currently listed petition
      getPetitionSignatures: function(id) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + id + 'signatures')
          .then((response) => {
            this.petitionSignatures = response.data;
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
