<template>
  <div id="login" class="container sign-in-container">
    <div class="form-group">
      <label for="inputEmail">Email address</label>
      <input type="email" class="form-control" id="inputEmail" v-model="email" required autofocus>
    </div>
    <div class="form-group">
      <label for="inputPassword">Password</label>
      <input type="password" class="form-control" id="inputPassword" v-model="password" required>
    </div>
    <button class="btn btn-lg btn-primary btn-sign-in" @click="signin">Login</button>
    <button class="btn btn-lg btn-primary btn-sign-in" @click="signup">Register</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  created () {
    if (localStorage.getItem('login_token') != null) {
      this.$axios.get('user/userid', {
        headers: {
          token: localStorage.getItem('login_token')
        }
      }).then(function ({data}) {
        if (data.status) {
          this.$router.push('/')
        } else {
          localStorage.removeItem('login_token')
        }
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    }
  },
  methods: {
    cleanInputForm () {
      this.email = null
      this.password = null
    },
    signup () {
      this.$axios.post('user/signup', {
        email: this.email,
        password: this.password
      }).then(function ({data}) {
        if (data.status) {
          this.cleanInputForm()
        } else {
          console.log(data.msg)
        }
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    },
    signin () {
      this.$axios.post('user/signin', {
        email: this.email,
        password: this.password
      }).then(function ({data}) {
        if (data.status) {
          localStorage.setItem('login_token', data.msg)
          this.$router.push('/')
        } else {
          console.log(data.msg)
        }
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.sign-in-container {
    margin-top: 50px;
    margin: 50px auto;
    width: 550px;
    border-width: 0 0 2px;
    border-color: black;
    border: 1px solid black;
    border-radius: 4px
}
.btn-sign-in {
    margin-bottom: 30px;
}
@media (max-width: 450px){
	.sign-in-container {
        margin: 0 auto;
        width: 250px;
    }
}
</style>
