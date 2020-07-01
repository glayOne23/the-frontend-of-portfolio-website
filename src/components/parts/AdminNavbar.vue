<template>
<nav class="navbar has-background-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <p class="title is-4 white">Admin Page</p>
    </a>

    <a role="button" class="navbar-burger burger white" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
      
  </div>


  <div id="navbarBasicExample" class="navbar-menu is-active has-background-dark">

    <div class="navbar-end">
      <div class="navbar-item">        
        <div class="buttons">
          <a class="button is-danger" @click.prevent="logout">
            <strong>Logout</strong>
          </a>          
        </div>
      </div>
    </div>
    
  </div>
</nav>
</template>


<script>

import {mapActions} from 'vuex'

export default {

  name: 'AdminNavbar',

  methods : {
    ...mapActions({
      logoutAction : 'auth/logout'
    }),

    logout(){
      this.logoutAction().then(() => {
        this.$router.replace({
          name : 'Login'
        })
      })
    }
  }
}  
</script>


<style>
  margin-zero {
    margin: 0px;
  }

  .navbar{
    padding-left: 1.6em;
    padding-right: 1.6em;
  }
</style>