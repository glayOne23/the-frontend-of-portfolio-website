<template>
<div class="wrap-banner hero is-primary is-bold">
    <div class="main-title">                
    <p class="title is-2">
        Hai,
    </p>        
    <!-- <vue-typed-js :strings="this.typed" class="center-typed-js">
        <h1 class="title is-2">I'm Hammam. <span class="typing"></span></h1>
    </vue-typed-js> -->
    <h1 class="title is-2 center-typed-js">I'm {{this.introduction.name}}. <span class="typing" v-show="this.display"></span></h1>
    <!-- <h1 class="title is-2">
        I'm Hammam. Nice to meet you
    </h1> -->
    <h2 class="title is-5">        
        <!-- I love to code and always eager to learn new things. Previously I have learned the PHP, java, python programming language. I have built some projects using Laravel and Django Rest Framework -->
        {{this.introduction.description}}
    </h2>
    <button class="button is-white">     
        <a :href="this.introduction.connect">
          <span class="icon portfolio-font-color">
              <i class="fab fa-linkedin"></i>
          </span>
          <span class="portfolio-font-color">Connect</span>
        </a>   
    </button>
    </div>
    <Particle></Particle>
</div>
</template>


<script>
// @ is an alias to /src
import Particle from '@/components/parts/Particle.vue';
import axios from 'axios';
import Typed from 'typed.js'

export default {
  name: 'Main',
  components: {
    Particle
  },

  data() {
      return {
          introduction: [],          
          windowWidth: 0,          
          display : false
      }
  },

  created() {
    axios.get('introductions')
    .then(response => {            
        this.introduction = response.data          
        var options = {
          strings : response.data.greatings,
          typeSpeed : 40,
        }
        new Typed('.typing', options)        
    })    
  },

  mounted() {
    this.$nextTick( () => {
      window.addEventListener('resize', this.getWindowWidth);      

      //Init
      this.getWindowWidth()      
    })
  },

  methods : {
    displayTyping() {
      if (this.windowWidth > 960) {        
        this.display =  true
        
      } else {     
        this.display = false
      }
    },

    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
      this.displayTyping()
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);   
  }
  
}
</script>


<style lang="scss">
//   h2 {
//     font-weight: 100;
//     font-size: 2rem;
//   }
  // .teko {
  //   font-family: 'Teko', sans-serif;
  // }  
  .particles-js {
    // background-image: url("../assets/aurora.jpg");
    background: rgb(41,228,169);
    background: linear-gradient(165deg, rgba(41,228,169,1) 0%, rgba(12,191,84,1) 67%, rgba(0,170,68,1) 100%);
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .wrap-banner {
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
    // tambahan
    padding-top:17vw;
    padding-bottom:17vw;        
  }
  .main-title {
    color: #fff;
    z-index: 999;
    padding-left: 20vw;
    padding-right: 20vw;
  }
  .center-typed-js{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5em;
  }

</style>