<template>
  <div>
    <template>
      <div>

        <br></br>
        <div v-if="errorFlag" style="color: red;">
          {{ error }}
        </div>

        <div class="HomePage">
          <br>
          <a> <router-link :to="{ name: 'home' }"> Home </router-link></a>
        </div>

        <div class="HomePage">
          <br>
          <a type="button" href="#Create" class="btn btn-info btn-lg" data-toggle="modal" data-target="#CreatePetitionModal"> Create a Petition </a>
          <a type="button" href="#View" class="btn btn-info btn-lg" data-toggle="modal" data-target="#ViewModal"> View My Petitions </a>
        </div>

        <!--Modal to create a Petition-->
        <div id="CreatePetitionModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h5 class="modal-title" id="loginUserModalLabel"> Create a New Petition </h5>
              </div>
              <div class="modal-body">
                <h1>Petition Details</h1>
                <v-app id="inspire">
                  <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                    {{error}}
                  </v-alert>
                  <v-form  v-on:submit.prevent="createPetition()"
                          ref="form"
                          v-model="valid"
                          lazy-validation
                  >
                    <v-text-field
                      v-model="title"
                      label="Petition Title"
                      required
                    />

                    <v-text-field
                      v-model="description"
                      label="Petition Describe your petition"
                      required
                    />

                    <template>
                      <v-container fluid>
                        <v-row align="center">
                          <v-select
                            v-model="selectedCategory"
                            :items="categoryNames"
                            label="Choose a Category"
                          >
                          </v-select>
                        </v-row>
                      </v-container>
                    </template>


                    <v-text-field
                      v-model="closingDate"
                      label="Closing Date e.g 2020-12-12 (OPTIONAL)"
                      required
                    />

                    <v-btn
                      color="success"
                      type="submit"
                    >
                      Create
                    </v-btn>

                  </v-form>
                </v-app>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>


        <br></br>

          <div id="petitions">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">Category</th>
                  <th class="text-left">Author's Name</th>
                  <th class="text-left">Signatures</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="petition in petitions">
                    <td>{{ petition.title }}</td>
                    <td>{{ petition.category }}</td>
                    <td>{{ petition.authorName }}</td>
                    <td>{{ petition.signatureCount }}</td>
                    <td><router-link :to="{ name: 'petition', params: { petition_id: petition.petitionId }}">View</router-link></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

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
        title: '',
        valid: true,
        description: '',
        category:'',
        picker: new Date().toISOString().substr(0, 10),
        closingDate:'',
        categoriesJson: [],
        categoryNames: [],
        categoryDict: {},
        selectedCategory: [],
        createdPetitionId: ''
      }
    },
    mounted: function() {
      this.getPetitions();
      this.getCategories();
      console.log(this.categoryDict);
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
      },

      //Create a new Petition as a Logged in User

      createPetition: function() {
        if (this.title === '') {
          alert("Please type a Petition Title");
          return;
        }
        if (this.description  === '') {
          alert("Your Petition needs a description");
          return;
        }

        if (this.selectedCategory === "") {
          alert("Please select a Petition Category");
          return;
        }

        var jsonPetition = {};
        jsonPetition["title"] = this.title;
        jsonPetition["description"] = this.description;
        jsonPetition["categoryId"] = this.categoryDict[this.selectedCategory];

        this.$http.post('http://localhost:4941/api/v1/petitions', jsonPetition,
          {headers:{'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
        .then((response) => {this.createdPetitionId = response.data.petitionId})
        .catch((error) => {
          this.error = error;
          this.errorFlag = true;
        });
      },

      //Function to get Petition Categories
      getCategories: function() {
        this.$http.get('http://localhost:4941/api/v1/petitions/categories')
        .then((response) => {
          this.categoriesJson = response.data;
          for (var i = 0; i < this.categoriesJson.length; i++) {
            this.categoryDict[this.categoriesJson[i].name] = this.categoriesJson[i].categoryId;
            this.categoryNames.push(this.categoriesJson[i].name);
          }
        })
        .catch((error) => { this.error = error; this.errorFlag = true; });
      }
    }
  }
</script>




<style scoped>
  .petitionsData {
    margin: auto;
    width: 50%;
    padding: 10px;

  }

  .HomePage {
    margin: auto;
    text-align: center
  }
</style>
