<template>
  <nav id="navbar" class="navbar navbar-default" style="margin-bottom:0;">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" to="/">HacktivOverflow</router-link>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
              <li><router-link :to="'/user/'+loggedInUserId">My Questions</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
              <li v-if="loginState">
                  <a href="#"  @click="logout">Logout</a>
              </li>
              <li v-else>
                  <a href="#" @click="login">Logout</a>
              </li>
          </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      loggedInUserId: '',
      loginState: localStorage.getItem('login_token') != null
    }
  },
  beforeCreate () {
    if (localStorage.getItem('login_token') != null) {
      this.$axios.get('user/userid', {
        headers: {
          token: localStorage.getItem('login_token')
        }
      }).then(function ({data}) {
        if (data.status) {
          this.loggedInUserId = data.msg
        } else {
          localStorage.removeItem('login_token')
          this.$router.push('/access')
        }
      }.bind(this)).catch(function (err) {
        console.log(err)
      })
    }
  },
  methods: {
    login () {
      this.$router.push('/access')
    },
    logout () {
      localStorage.removeItem('login_token')
      this.$router.push('/access')
    }
  }
}
</script>
<style scoped>
</style>
