<template>
  <div>

    <div v-if="errorFlag" style="color: red;">
      {{ error }}
    </div>

    <!-- Display a single petition-->
    <div v-if="$route.params.petition_id" >
      <div class="petitionView">
        <router-link :to="{ name: 'petitions' }" style="color: white;"> Back to Petitions </router-link>
        <br /><br />
      </div>

      <div class="petitionPage" v-if="checkLoggedIn()===true">
        <div>
          <a type="button" href="#Sign" class="btn btn-info btn-lg" data-toggle="modal" data-target="#signPetitionModal"
             v-on:click="signPetition($route.params.petition_id)"> Sign This Petition
          </a>
        </div>
        <div>
          <a type="button" href="#Remove" class="btn btn-info btn-lg" data-toggle="modal" data-target="#removePetitionModal"> Remove My Signature </a>
        </div>
        <br /><br />
      </div>

      <div class="petitionPage" v-if="checkLoggedIn()===false">
        <a type="button" href="#Sign" class="btn btn-info btn-lg" data-toggle="modal" data-target="#signInModal"> Sign This Petition </a>
        <br /><br />
      </div>

      <!-- Modal to request user to sign in first -->
      <div id="signInModal" class="modal fade" role="dialog">
        <template>
          <v-card>
            <v-card-title class="headline"> Authentication Required - Please login in to use this feature </v-card-title>
            <v-card-text>
              <a> <router-link :to="{ name: 'home' }" onclick="location.reload()" > Take me there </router-link> </a>
            </v-card-text>
          </v-card>
        </template>
      </div>

      <!--Modal to confirm signing of petition-->
      <div id="signPetitionModal" class="modal fade" role="dialog">
        <template>
          <v-card>
            <v-card-title class="headline"> NOTICE </v-card-title>
            <v-card-text> You have successfully signed this Petition </v-card-text>
            <v-card-actions>
              <v-btn color="green darken-1" onclick="location.reload()"> OK </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </div>

      <div class="petitionView">

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
                <th class="text-center">Name</th>
                <th class="text-center">City</th>
                <th class="text-center">Country</th>
                <th class="text-center">Date Signed</th>
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
        petitionSignatures: [],
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
      },

      signPetition: function(id) {
        this.$http.post('http://localhost:4941/api/v1/petitions/' + id + '/signatures', {},
          {headers: {'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
          .then((response) => {
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },

      checkLoggedIn: function () {
        if (localStorage.getItem("authId") && localStorage.getItem("authToken")) {
          return true;
        } else {
          return false;
        }
      },

      // checkSignedPetition: function () {
      //   //function to return true if a user has already signed a petition
      //   //else return false
      //   for (let i = 0; i < this.petitionSignatures.length; i++) {
      //     if (this.petitionSignatures[i].signatoryId === localStorage.getItem("authId")) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }
      //}
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

  .petitionPage {
    margin: auto;
    text-align: center
  }

</style>
