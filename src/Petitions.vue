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
              <tr>


              </tr>
            </table>

            <table>
              <tr v-for="petition in petitions">
                <br/> <td>{{ petition.title }}</td>
                <br/><td>{{ petition.category }}</td>
                <br/><td>{{ petition.authorName }}</td>
                <br/><td>{{ petition.signatureCount }}</td>
                <br/> <v-btn> <td><router-link :to="{ name: 'petition', params: { petition_id: petition.petitionId }}">View</router-link></td> </v-btn>
                <br ></br >

                <!--<td>
                  <v-img
                    :src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo'"
                    :lazy-src="'./assets/logo.jpg'"
                    alt="No Photo"
                    height="300"
                    width="300"
                  >
                  </v-img>
                </td> -->

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
        petitions: [],
      }
    },
    mounted: function() {
      this.getPetitions();
    },
    methods: {
      //get all the petitions
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
