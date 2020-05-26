<template>

  <v-app>

    <div>

      <div id="home" class="homeData">


        <br/><br/>
        <br/><br/>

        <div v-if="checkLoggedIn()===false">
          <v-btn block rounded href="#register"  color="primary" data-toggle="modal" data-target="#registerUserModal"> Register </v-btn>
          <br/><br/>
          <v-divider> </v-divider>
          <v-btn  href="#login" x-large color="success" data-toggle="modal" data-target="#loginModal"> Login </v-btn>
        </div>

        <!-- User logout button -->
        <br/><br/>
        <div v-if="checkLoggedIn()===true" class="logoutButton">
          <v-btn block rounded color="primary" v-on:click="logoutUser()"> Logout </v-btn>
        </div>
        <br/><br/>
        <br/><br/>

      </div>

      <div>
        <v-card>
          <v-system-bar color="indigo darken-3" dark> </v-system-bar>

          <v-card-text>
            <petitions-import> </petitions-import>
          </v-card-text>

        </v-card>

      </div>

      <!-- LOGIN User Modal -->
      <div id="loginModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h5 class="modal-title" id="loginUserModalLabel"> Welcome Back, Please Login </h5>
            </div>

            <div class="modal-body">
              <!-- Modal content -->
              <h1>Login</h1>
              <v-app id="inspire" style="height: 250px;">
                <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                  {{error}}
                </v-alert>
                <v-form v-on:submit.prevent="loginUserExisting()"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    :rules="emailChecker"
                    required
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-btn
                    color="success"
                    type="submit"
                  >
                    Login
                  </v-btn>
                </v-form>
              </v-app>
            </div>
          </div>
        </div>
      </div>


      <!-- Register Modal -->
      <div class="modal fade" id="registerUserModal" role="dialog">
        <div class="modal-dialog">
          <div v-if="errorFlag" class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>{{error}}</strong>.
          </div>
          <!-- Modal content -->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h5 class="modal-title" id="registerUserModalLabel">Register New Account</h5>
            </div>
            <div class="modal-body">
              <!-- Modal content -->
              <h1>Register</h1>
              <v-app style="height: 600px;">
                <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                  {{error}}
                </v-alert>
                <v-form v-on:submit.prevent="registerUser()"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                >
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    required
                  />
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    required
                  />
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    :rules="emailChecker"
                    required
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  />
                  <v-text-field
                    v-model="retypePassword"
                    label="Re-type Password"
                    type="password"
                    required
                  />

                  <v-text-field
                    v-model="city"
                    label="City (Optional)"
                  />
                  <v-text-field
                    v-model="country"
                    label="Country (Optional)"
                  />
                  <v-btn
                    color="success"
                    type="submit"
                  >
                    Register
                  </v-btn>
                </v-form>

              </v-app>

            </div>
          </div>

        </div>
      </div>

    </div>
  </v-app>


</template>

<script>
    import Petitions from './Petitions.vue';
    export default {
      data() {
        return {
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          country: '',
          error: '',
          errorFlag: '',
          password: '',
          retypePassword: '',
          valid: true,
          emailChecker: [
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          loginRules:[
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)||/^[a-zA-Z0-9_]*$/.test(v) || 'Username or E-mail must be valid'],
          name: '',
          isLoggedIn: false
        }
      },

      components: {
        'petitions-import':Petitions
      },

      methods: {
        //Register a user and ensure they are logged in
        registerUser: function(){

          //Check first name and last name are valid
          if (this.firstName === '') {
            alert("Your First Name is required!");
            return;
          }
          if (this.lastName === '') {
            alert("Your last name is required!");
            return;
          }
          //Execute email checks
          if (this.email === '') {
            alert("Your email is required!");
            return;
          }
          if (this.password === '') {
            alert("Please type in a password!");
            return;
          }
          if (this.password !== this.retypePassword){
            alert("Your passwords don't match!");
            return;
          }
          else {
            var jsonData = {};
            jsonData["name"] = this.firstName + " " + this.lastName;
            jsonData["email"] = this.email;
            jsonData["password"] = this.password;

            if (this.city === '') {
              this.city = null;
            } else {
              jsonData["city"] = this.city;
            }

            if (this.country === '') {
              this.country = null;
            } else {
              jsonData["country"] = this.country;
            }

            this.$http.post('http://localhost:4941/api/v1/users/register', jsonData)
              .then((response) => {
                this.loginUser();
                this.$router.push('/petitions');
                $('#registerUserModal').modal('hide');
            }).catch((error) => {
              this.error = "This Email is already in use!";
              this.errorFlag = true;
            });
          }
        },
        loginUser: function() {
          this.$http.post('http://localhost:4941/api/v1/users/login', JSON.stringify({
            "email": this.email,
            "password": this.password
          }),{
            headers: {
              'Content-Type': 'application/json'
            }})
            .then((response) => {
              localStorage.setItem("authId", response.data.userId);
              localStorage.setItem("authToken", response.data.token);
              location.reload();
            }).catch((error) =>{
            this.error = error;
            this.errorFlag = true;
          });
        },
        logoutUser: function() {
          this.$http.post("http://localhost:4941/api/v1/users/logout", {},
            {headers:{'X-Authorization': localStorage.getItem("authToken"), 'Content-Type': 'application/json'}})
          .then(function(){
            localStorage.removeItem("authId");
            localStorage.removeItem("authToken");
            location.reload();
          }, function (error){
            this.error = error;
            this.errorFlag = true;
          });
        },
        loginUserExisting: function() {
          if (this.email === '' || (!(this.email.includes("@")))) {
            alert("A valid email is required!");
            return;
          }
          if (this.password === '') {
            alert("Please type in a password!");
            return;
          } else {
            var loginJsonData = {};
            var name = this.firstName + " " + this.lastName;
            loginJsonData["email"] = this.email;
            loginJsonData["password"] = this.password;
            this.$http.post('http://localhost:4941/api/v1/users/login', loginJsonData,
              {headers: {'Content-Type': 'application/json'}})
              .then((response) => {
                localStorage.setItem("authId", response.data.userId);
                localStorage.setItem("authToken", response.data.token);
                this.$router.push('/petitions');
                $('#loginModal').modal('hide');
                location.reload();
              }).catch((error) => {
              this.error = "Invalid Email or Password Provided";
              this.errorFlag = true;
            });
          }
        },

        checkLoggedIn: function () {
          if (localStorage.getItem("authId")  && localStorage.getItem("authToken")) {
            return true;
          } else {
            return false;
          }
        },
      }
    }
</script>

<style scoped>

  .homeData {
    margin: auto;
    width: 50%;
    padding: 10px;
    text-align: center
  }


</style>
