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
      <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#registerUserModal"> Register </a>
      <br/><br/>
      <a type="button" href="#login" class="btn btn-info btn-lg" data-toggle="modal" data-target="#loginModal">Login</a>
    </div>

    <div class="modal fade" id="registerUserModal" role="dialog"
         aria-labelledby="registerUserModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div v-if="errorFlag" class="alert">
          <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          <strong>{{error}}</strong>.
        </div>
        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerUserModalLabel">Register New Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Enter Your details here
            <!-- Modal content -->
            <h1>Register</h1>
            <v-app>
              <v-alert v-if="errorFlag" color="error" icon="warning" value="true">
                {{error}}
              </v-alert>
            </v-app>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
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
          username: '',
          email: '',
          error: '',
          errorFlag: '',
          password: '',
          retypePassword: '',
          valid: true,
          name: '',
        }
      },
      methods: {

      }
    }
</script>

<style scoped>

</style>
