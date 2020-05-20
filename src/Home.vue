<template>
  <div>
    <div id="home" >

      <br/>
      PETITIONS NZ
      <br/><br/>
      Make a Difference Today
      <br/><br/>
      <table>
        <tr>
          <v-btn> <td><router-link :to="{ name: 'petitions'}"> Browse Petitions </router-link></td> </v-btn>
          <br/>
        </tr>
      </table>
      <br/><br/>
      <a type="button" href="#register" class="btn btn-primary" data-toggle="modal" data-target="#registerUserModal"> Register </a>
      <br/><br/>
      <a type="button" href="#login" class="btn btn-info btn-lg" data-toggle="modal" data-target="#loginModal">Login</a>
    </div>

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
            <v-app>
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
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
          name: ''
        }
      },
      methods: {
        //Register a user and ensure they are logged in
        registerUser: function(){

          //Check first name and last name are valid
          if (this.firstName === '') {
            alert("Your First Name is required!")
          }
          if (this.lastName === '') {
            alert("Your last name is required!")
          }
          //Execute email checks
          if (this.email === '') {
            alert("Your email is required!")
          }
          if (this.password === '') {
            alert("Please type in a password!")
          }
          if (this.password !== this.retypePassword){
            alert("Your passwords don't match!")
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
              this.error = error;
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
              this.$cookies.set("authId", response.body.userId);
              this.$cookies.set("authToken", response.body.token);
              location.reload();
            }).catch((error) =>{
            this.error = error;
            this.errorFlag = true;
          });
        }
      }
    }
</script>

<style scoped>

</style>
