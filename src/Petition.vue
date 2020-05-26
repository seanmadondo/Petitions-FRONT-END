<template>
  <div>

    <v-app>
      <!-- Display a single petition-->
      <div v-if="$route.params.petition_id" >
        <div class="petitionView">
          <br/>
          <router-link :to="{ name: 'petitions' }" style="color: black;"> <span class="material-icons"> arrow_back </span>  </router-link>
          <br /><br />
        </div>

        <div v-if="Date.parse(onePetition.closingDate) < Date.parse(todaysDate)"  class="petitionView">
          <v-chip color="red" large chip text-color="white"> CLOSED </v-chip>
        </div>

        <div v-else>
          <!-- if this user is logged in, give access to the sign and remove signature buttons -->
          <div class="petitionPage" v-if="checkLoggedIn()===true">
            <div v-if="checkPetitionSigned()===false">
              <v-btn type="button" href="#Sign" color="warning" data-toggle="modal" data-target="#signPetitionModal"
                 v-on:click="signPetition($route.params.petition_id)" > Sign This Petition
              </v-btn>
            </div>
            <div v-if="checkPetitionSigned()===true">
              <v-btn type="button" href="#Remove" color="error" data-toggle="modal" data-target="#removeSignModal"
                 v-on:click="removeSignature($route.params.petition_id)"> Remove My Signature </v-btn>
            </div>
            <br /><br />
          </div>
          <div class="petitionPage" v-if="checkLoggedIn()===false">
            <v-btn type="button" href="#Sign" color="warning" data-toggle="modal" data-target="#signInModal"> Sign This Petition </v-btn>
            <br /><br />
          </div>
        </div>


        <!-------------------------------------------------------------------------------------------------------------->

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

        <!-- Modal to confirm removal of signature-->
        <div id="removeSignModal" class="modal fade" role="dialog">
          <template>
            <v-card>
              <v-card-title class="headline"> NOTICE </v-card-title>
              <v-card-text> You have successfully removed your signature </v-card-text>
              <v-card-actions>
                <v-btn color="green darken-1" onclick="location.reload()"> OK </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </div>


        <div class="petitionView">

          <table style="margin-left:auto;margin-right:auto;" >
            <tr> <td> <img style="width:400px" :src="'http://localhost:4941/api/v1/petitions/' + $route.params.petition_id + '/photo'" >   </td></tr>
            <tr> <td>  <h4>{{ onePetition.title }} </h4>  ({{ onePetition.category }}) </td></tr>
            <v-divider></v-divider>

            <tr> <td> {{ onePetition.description }} </td></tr>
            <v-divider></v-divider>

            <tr> <td> By <br/>{{ onePetition.authorName }} </td></tr>
            <v-divider></v-divider>

            <tr> <td> {{ onePetition.authorCity }} {{ onePetition.authorCountry }}</td></tr>
            <v-divider></v-divider>

            <tr> <td>Number of Signatures <br/> {{ onePetition.signatureCount }} </td></tr>
            <v-divider></v-divider>

            <tr> <td>Created Date <br/> {{ onePetition.createdDate }} </td></tr>

            <v-divider></v-divider>
            <tr> <td>Closing Date <br/>{{ onePetition.closingDate }} </td></tr>

            <v-divider></v-divider>
            <br />
            <!-- TODO: Get the hero image -->
            <v-list-item-action-text> <h4> Signatures </h4> </v-list-item-action-text>
            <br />
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
    </v-app>

<!--    &lt;!&ndash; Display a single petition&ndash;&gt;-->
<!--    <div v-if="$route.params.petition_id" >-->
<!--      <div class="petitionView">-->
<!--        <br/>-->
<!--        <router-link :to="{ name: 'petitions' }" style="color: black;"> Back  </router-link>-->
<!--        <br />-->
<!--      </div>-->
<!--      -->
<!--      <div v-if="Date.parse(onePetition.closingDate) < Date.parse(todaysDate)"  class="petitionView">-->
<!--          <v-chip color="red" x-large > CLOSED </v-chip>-->
<!--      </div>-->

<!--      <div v-else>-->
<!--        &lt;!&ndash; if this user is logged in, give access to the sign and remove signature buttons &ndash;&gt;-->
<!--        <div class="petitionPage" v-if="checkLoggedIn()===true">-->
<!--          <div v-if="checkPetitionSigned()===false">-->
<!--            <a type="button" href="#Sign" class="btn btn-warning btn-lg" data-toggle="modal" data-target="#signPetitionModal"-->
<!--               v-on:click="signPetition($route.params.petition_id)"> Sign This Petition-->
<!--            </a>-->
<!--          </div>-->
<!--          <div v-if="checkPetitionSigned()===true">-->
<!--            <a type="button" href="#Remove" class="btn-danger btn-info btn-lg" data-toggle="modal" data-target="#removeSignModal"-->
<!--               v-on:click="removeSignature($route.params.petition_id)"> Remove My Signature </a>-->
<!--          </div>-->
<!--          <br /><br />-->
<!--        </div>-->
<!--        <div class="petitionPage" v-if="checkLoggedIn()===false">-->
<!--          <a type="button" href="#Sign" class="btn btn-warning btn-lg" data-toggle="modal" data-target="#signInModal"> Sign This Petition </a>-->
<!--          <br /><br />-->
<!--        </div>-->
<!--      </div>-->


<!--      &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--      &lt;!&ndash; Modal to request user to sign in first &ndash;&gt;-->
<!--      <div id="signInModal" class="modal fade" role="dialog">-->
<!--        <template>-->
<!--          <v-card>-->
<!--            <v-card-title class="headline"> Authentication Required - Please login in to use this feature </v-card-title>-->
<!--            <v-card-text>-->
<!--              <a> <router-link :to="{ name: 'home' }" onclick="location.reload()" > Take me there </router-link> </a>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </template>-->
<!--      </div>-->

<!--      &lt;!&ndash;Modal to confirm signing of petition&ndash;&gt;-->
<!--      <div id="signPetitionModal" class="modal fade" role="dialog">-->
<!--        <template>-->
<!--          <v-card>-->
<!--            <v-card-title class="headline"> NOTICE </v-card-title>-->
<!--            <v-card-text> You have successfully signed this Petition </v-card-text>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="green darken-1" onclick="location.reload()"> OK </v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </template>-->
<!--      </div>-->

<!--      &lt;!&ndash; Modal to confirm removal of signature&ndash;&gt;-->
<!--      <div id="removeSignModal" class="modal fade" role="dialog">-->
<!--        <template>-->
<!--          <v-card>-->
<!--            <v-card-title class="headline"> NOTICE </v-card-title>-->
<!--            <v-card-text> You have successfully removed your signature </v-card-text>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="green darken-1" onclick="location.reload()"> OK </v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </template>-->
<!--      </div>-->


<!--      <div class="petitionView">-->

<!--        <table style="margin-left:auto;margin-right:auto;" >-->
<!--          <tr> <td> <img style="width:400px" :src="'http://localhost:4941/api/v1/petitions/' + $route.params.petition_id + '/photo'" >   </td></tr>-->
<!--          <tr> <td>  <h4>{{ onePetition.title }} </h4>  ({{ onePetition.category }}) </td></tr>-->
<!--          <v-divider></v-divider>-->

<!--          <tr> <td> {{ onePetition.description }} </td></tr>-->
<!--          <v-divider></v-divider>-->

<!--          <tr> <td> By <br/>{{ onePetition.authorName }} </td></tr>-->
<!--          <v-divider></v-divider>-->

<!--          <tr> <td> {{ onePetition.authorCity }} {{ onePetition.authorCountry }}</td></tr>-->
<!--          <v-divider></v-divider>-->

<!--          <tr> <td>Number of Signatures <br/> {{ onePetition.signatureCount }} </td></tr>-->
<!--          <v-divider></v-divider>-->

<!--          <tr> <td>Created Date <br/> {{ onePetition.createdDate }} </td></tr>-->

<!--          <v-divider></v-divider>-->
<!--          <tr> <td>Closing Date <br/>{{ onePetition.closingDate }} </td></tr>-->

<!--          <v-divider></v-divider>-->
<!--          <br />-->
<!--          &lt;!&ndash; TODO: Get the hero image &ndash;&gt;-->
<!--          <v-list-item-action-text> <h4> Signatures </h4> </v-list-item-action-text>-->
<!--          <br />-->
<!--          <v-simple-table>-->
<!--            <template v-slot:default>-->
<!--              <thead>-->
<!--              <tr>-->
<!--                <th class="text-center">Name</th>-->
<!--                <th class="text-center">City</th>-->
<!--                <th class="text-center">Country</th>-->
<!--                <th class="text-center">Date Signed</th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr v-for="signature in petitionSignatures">-->
<!--                <td> {{signature.name }}</td>-->
<!--                <td> {{ signature.city }}</td>-->
<!--                <td> {{signature.country }}</td>-->
<!--                <td> {{signature.signedDate }}</td>-->
<!--                <br/>-->
<!--              </tr>-->
<!--              </tbody>-->

<!--            </template>-->
<!--          </v-simple-table>-->

<!--        </table>-->

<!--      </div>-->
<!--    </div>-->

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
        signedPetitions: [],
        todaysDate: ''
      }
    },
    mounted: function() {
      this.getDateToday();
      this.getOnePetition(this.$route.params.petition_id);
      this.getPetitionSignatures(this.$route.params.petition_id);
      this.checkPetitionSigned();
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
       removeSignature: function(id) {
         this.$http.delete('http://localhost:4941/api/v1/petitions/' + id + '/signatures',
           {headers: {'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
           .then((response) => {
           })
           .catch((error) => {
             this.error = error;
             this.errorFlag = true;
           });
       },

      checkPetitionSigned: function() {
        for (var i = 0; i < this.petitionSignatures.length; i++) {
          if (parseInt(this.petitionSignatures[i].signatoryId) === parseInt(localStorage.getItem('authId'))) {
            return true;
          }
        }
        return false;
      },

      getDateToday: function() {
        var today = new Date();
        this.todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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

  .petitionPage {
    margin: auto;
    text-align: center
  }

</style>
