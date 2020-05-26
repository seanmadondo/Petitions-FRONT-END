<template>
  <div id="account">

    <br/><br/>
    <br/><br/>

    <div v-if="checkLoggedIn()===false" class="usersPage">
      <v-chip> Ooops, There's nothing to see here 😢 </v-chip>
      <br/><br/>
      <h1> <v-chip> <a> <router-link :to="{ name: 'home' }" > Please create an account or login  </router-link></a> </v-chip> </h1>
      <br/><br/>
    </div>

    <div v-if="checkLoggedIn()===true" class="usersPage">


      <!-- Button to allow user to edit their details -->
      <a type="button" href="#Edit" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#EditUserModal"> Edit My Details </a>
      <a type="button" href="#Update" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#updatePasswordModal"> Update Password </a>
      <br/><br/>
      <br/><br/>
      <span class="material-icons">account_box</span>
      <br/><br/>

      <!-- Table that will have users details-->
      <table style="margin-left:auto;margin-right:auto;">
        <h1> <tr> <td> {{ userDetails.name }}</td></tr> </h1>
        <v-divider></v-divider>
        <tr> <td> From </td></tr>
        <tr> <td> {{ userDetails.city }}, {{ userDetails.country }} </td></tr>
        <v-divider></v-divider>
        <tr> <td> Email </td></tr>
        <tr> <td> {{ userDetails.email }}</td></tr>
        <v-divider></v-divider>
      </table>

    </div>


    <!--Modal to edit user details -->
    <div id="EditUserModal" class="modal fade" role="dialog" tabindex="-1" aria-labelledby="ViewPetitionModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title" id="EditUserModalLabel"> Edit Your Account Details </h5>
          </div>
          <div class="modal-body">
            <h3>Update Details (Optional) </h3>
            <v-app style="height: 600px;">
              <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                {{error}}
              </v-alert>
              <v-form v-on:submit.prevent="editUserDetails()" ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="fullName" label="Your Full Name"> </v-text-field>
                <v-chip small> Current ({{userDetails.name}})</v-chip>
                <v-text-field  v-model="email" label="Email" :rules="emailChecker"> </v-text-field>
                <v-chip small> Current ({{userDetails.email}})</v-chip>
                <v-text-field v-model="city" label="City"> </v-text-field>
                <v-chip small> Current ({{userDetails.city}})</v-chip>
                <v-text-field v-model="country" label="Country"> </v-text-field>
                <v-chip small> Current ({{userDetails.country}})</v-chip>
                <br/> <br/>

                <br/> <br/>
                <v-btn type="submit" class="success"> Submit </v-btn>
              </v-form>
            </v-app>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal to update Password -->
    <div id="updatePasswordModal" class="modal fade" role="dialog" tabindex="-1" aria-labelledby="updatePasswordModal" aria-hidden="true">
      <div class=modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title" id="passwordModalLabel"> Update your password </h5>
          </div>
          <div class="modal-body">
            <h3> Password Details </h3>
            <v-app style="height: 350px;">
              <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                {{error}}
              </v-alert>
              <v-form v-on:submit.prevent="updatePassword()" ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="oldPassword" label="Current Password" type="password" required> </v-text-field>
                <v-text-field v-model="newPassword" label="New Password" type="password" required> </v-text-field>
                <v-text-field v-model="retypeNewPassword" label="Re-type New Password" type="password" required> </v-text-field>
                <v-btn type="submit" class="success"> Submit </v-btn>
              </v-form>
            </v-app>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
    export default {
      data () {
        return {
          error: '',
          errorFlag: false,
          userDetails: [],
          fullName: '',
          email: '',
          city: '',
          country: '',
          valid: true,
          oldPassword:'',
          newPassword: '',
          retypeNewPassword: '',
          emailChecker: [
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
        }
      },

      mounted: function(){
        if (this.checkLoggedIn()===true) {this.getUserDetails();}

      },

      methods: {
        //get The users details
        getUserDetails: function () {
          this.$http.get('http://localhost:4941/api/v1/users/' + localStorage.getItem("authId"),
            {headers: {'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
            .then((response) => {
              this.userDetails = response.data;
            })
            .catch((error) => {
              this.error = "Please enter a date that is in the future!";
              this.errorFlag = true;
            });
        },

        //Check user is logged in to use functions
        checkLoggedIn: function () {
          if (localStorage.getItem("authId") && localStorage.getItem("authToken")) {
            return true;
          } else {
            return false;
          }
        },

        editUserDetails: function () {

          var editUserJson = {};
          if (!(this.fullName === '')){
            editUserJson["name"] = this.fullName;
          }

          if (!(this.email === '')) {
            editUserJson["email"] = this.email;
          }

          if (!(this.city === '')){
            editUserJson["city"] = this.city;
          }

          if (!(this.country === '')){
            editUserJson["country"] = this.country;
          }

          if (Object.keys(editUserJson).length === 0) {
            alert("Nothing to edit");
            return;
          } else {

            this.$http.patch('http://localhost:4941/api/v1/users/' + localStorage.getItem("authId"), editUserJson,
                {headers: {'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
              .then((response) => {
                $('#EditUserModal').modal('hide');
                location.reload();
              })
              .catch((error) => {
                this.error = "A user with this email already exists!";
                this.errorFlag = true;
              });
          }
        },

        updatePassword: function() {

          if (this.oldPassword === '') {
            alert("Your old Password is required!");
            return;
          }

          if (this.newPassword === '') {
            alert("Your new Password is required!");
            return;
          }

          if (this.newPassword === this.oldPassword) {
            alert("New Password needs to differ from old!");
            return;
          }

          if (this.retypeNewPassword !== this.newPassword) {
            alert("Re-type password needs to match!");
            return;
          } else {

            var jsonPassword = {};
            jsonPassword["currentPassword"] = this.oldPassword;
            jsonPassword["password"] = this.newPassword;

            this.$http.patch('http://localhost:4941/api/v1/users/' + localStorage.getItem("authId"), jsonPassword,
              {headers: {'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
              .then((response) => {
                $('#updatePasswordModal').modal('hide');
                location.reload();
              })
              .catch((error) => {
                this.error = "Incorrect Password";
                this.errorFlag = true;
              });
          }
        }
      }
    }
</script>

<style scoped>
  .usersPage {
    margin: auto;
    text-align: center
  }

</style>
