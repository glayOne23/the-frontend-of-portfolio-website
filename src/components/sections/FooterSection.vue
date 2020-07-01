<template>
<footer class="footer">
  <div class="content has-text-centered">
    <!-- <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt pariatur delectus perspiciatis itaque, quos voluptatem ex assumenda perferendis eos, corporis architecto ducimus aspernatur porro dolores nemo hic facilis minus officiis.
    </p> -->
    <div class="columns is-centered is-vcentered">
      <div class="column is-one-quarter"></div>
      <div class="coloumn is-one-quarter line">
        <p class="title is-2 white"> Connect </p>    
      </div>
      
      <div class="column is-one-quarter">
          <span class="icon is-large space" v-for="(connect, i) in connects" :key="i">
            <a :href="connect.url" class="white icon-url">
              <i :class="connect.icon"></i>        
            </a>
          </span>            
      </div>      
      <div class="column is-one-quarter"></div>
    </div>
  </div>
</footer>
</template>


<script>

import axios from 'axios';

export default {
  name: 'FooterSection',

  data() {
      return {
          connects: [],          
      }
  },

  created() {
    axios.get('connects')
    .then(response => {            
        this.connects = response.data                  
    })    
  }


}  
</script>


<style>
.footer{
    background: rgb(41,228,169);
    background: linear-gradient(165deg, rgba(41,228,169,1) 0%, rgba(12,191,84,1) 67%, rgba(0,170,68,1) 100%);
    color : white;
}
.footer .content{
    margin-top: 3em;
}
.white{
    color: white;
}
.space{
  margin: 1em;
}
.icon-url:hover {
  color: white;
  transform: scale(1.2);
}

@media only screen and (min-width: 768px) {
  .line {
  padding-left: 1em;
  padding-right: 0.5em;
  border-right: 2px dotted white;
  }
}
</style>