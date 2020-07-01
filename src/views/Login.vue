<template>
<div class="admin-login has-text-centered">  
  <div class="continer">
    <div class="box">
      <article class="media">    
        <div class="media-content">
          
          <form method="post" @submit.prevent="submit" @keydown="errors.clear($event.target.name)">
            <div class="content">

              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input class="input is-success" type="text" placeholder="Username" name="name" v-model="form.name">
                </div>
                <span class="help is-danger" v-if="errors.has('name')" v-text="errors.get('name')" ></span>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input is-success" type="password" placeholder="Password" name="password" v-model="form.password">
                  <span class="help is-danger" v-if="errors.has('password')" v-text="errors.get('password')" ></span>
                </div>          
              </div>
              <hr>

              <div class="buttons is-centered">          
                <button type="submit" class="button is-success" :disabled="errors.anyError()">Login</button>
              </div>
              
            </div>
          </form>

        </div>
      </article>
    </div>    
  </div>

</div>
</template>


<script>

import {mapActions} from 'vuex'
import Error from '@/helper/Error.js';


export default {

  name: 'Login',

  data () {
    return {
      form : {
        name : '',
        password : '',
      },

      errors : new Error(),
    }
  },
  
  methods :{

    ...mapActions({
      login : 'auth/login'
    }),

    async submit() {
       this.login(this.form)
       .then(() => {
         this.$router.replace({
           name : 'Admin'
         })
       })
       .catch((error) => {
          this.errors.record(error.response.data)
       })
      }
    },

}
</script>


<style lang="scss">

  .admin-login {    
    background: #34393f;    
    color: white;
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100vh;
    justify-content: center;
    // tambahan
    padding:5em;    
  }

</style>