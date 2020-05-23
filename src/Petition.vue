<template>
  <div class="petitionView">

    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <!-- Display a single petition-->
    <div v-if="$route.params.petition_id" >
      <div>
        <router-link :to="{ name: 'petitions' }" style="color: white;"> Back to Petitions </router-link>
        <br /><br />

        <table>
          <tr> <td>Petition Title <br/> {{ onePetition.title }}  </td></tr>
          <v-divider></v-divider>
          <br/>
          <tr> <td>Petition Description <br/> {{ onePetition.description }} </td></tr>
          <v-divider></v-divider>
          <br/>
          <tr> <td>Petition Author <br/>{{ onePetition.authorName }} </td></tr>
          <v-divider></v-divider>
          <br/>
          <tr> <td>City <br/>{{ onePetition.authorCity }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <tr> <td>Country <br/> {{ onePetition.authorCountry }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <tr> <td>Number of Signatures <br/> {{ onePetition.signatureCount }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <tr> <td>Category <br/>{{ onePetition.category }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <tr> <td>Created Date <br/> {{ onePetition.createdDate }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <tr> <td>Closing Date <br/>{{ onePetition.closingDate }} </td></tr>
          <br/>
          <v-divider></v-divider>
          <!-- TODO: Get the hero image -->
          <v-list-item-action-text> Signatures </v-list-item-action-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">City</th>
                <th class="text-left">Country</th>
                <th class="text-left">Date Signed</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="signature in petitionSignatures">
                <td> {{signature.name }}</td>
                <td> {{ signature.city }}</td>
                <td> {{signature.country }}</td>
                <td> {{signature.signedDate }}</td>
                <br/>
              </tr>
              </tbody>

            </template>
          </v-simple-table>

        </table>

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
        this.$http.get('http://localhost:4941/api/v1/petitions/' + id + '/signatures')
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

  .petitionView {
    margin: auto;
    width: 50%;
    padding: 10px;
    text-align: center
  }

</style>
