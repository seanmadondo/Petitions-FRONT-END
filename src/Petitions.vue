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
            <table>g
              <tr v-for="petition in petitions">
                <td>{{ petition.title }}</td>
                <td>{{ petition.category }}</td>
                <td>{{ petition.authorName }}</td>
                <td>{{ petition.signatureCount}}</td>
                <td><router-link :to="{ name: 'petition', params: { petition_id: petition.petitionId }}">View</router-link></td>
                <br ></br >

                <!-- TODO Find out how to get the image
                <td>
                  <v-img
                    :src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo/'"
                    :lazy-src="'/images/Default.jpg'"
                    alt="No Photo"
                    height="300"
                    width="300"
                  >
                  </v-img>
                </td>
                -->

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
