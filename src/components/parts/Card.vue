<template>
<div class="card is-shadowless">
  <div class="card-image">
    <figure class="image is-4by3 one-edge-shadow">
      <!-- <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"> -->
      <!-- <img :src="resolve_img_url(image)" alt="Placeholder image"> -->
      <img :src="image" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content has-text-left">
    <div class="media">    
      <div class="media-content">
        <p class="title is-5 portfolio-font-color">{{name}}</p>      
        <p class="portfolio-font-color">{{created_at | formatDate}} </p>

        <div class="content has-text-left" v-if="description.length >= 150">      
          <span v-if="!readMoreActivated">{{description.slice(0, 150)}}</span>
          <a class="a-readmore" v-if="!readMoreActivated" @click="activateReadMore" href.prevent="">...Read more</a>
          <span v-if="readMoreActivated">
            {{description}}
          <a class="a-readmore" v-if="readMoreActivated" @click="deactivateReadMore" href.prevent="">Read less</a>
          </span>
        </div>
        
        <div class="content has-text-left" v-if="description.length < 150">      
          <span>{{description}}</span>      
        </div>

        <a :href="url">          
          <button class="button has-text-left button-work portfolio-font-color">     
              <span class="">Go to Project</span>
          </button>
        </a>   

      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {

  name: 'Card',
    props: {
    image: String,
    name: String,
    description: String,
    url: String,
    created_at: String,
  },

  data(){
    return {
      readMoreActivated: false
    }
  }, 

  methods: {
  // resolve_img_url: function (path) {
  //   let images = require.context('../../assets/', false, /\.png$|\.jpg$/)
  //   return images("./"+path)
  // }

  activateReadMore(){
    this.readMoreActivated = true;
  },

  deactivateReadMore(){
    this.readMoreActivated = false;
  },
}
  
}
</script>


<style lang="scss">

@media only screen and (max-width: 767px) {
  /* For mobile phones: */
  .card {
  padding-top: 1em;
  padding-bottom: 0.5em;
  border-bottom: 2px dotted #00aa44;
  }
}

.button-work:hover {
  color : white;
  background-color:#00aa44;
}

.a-readmore {
  color:#00aa44;
}

.a-readmore:hover {
  color:#00d154;
}

@media only screen and (min-width: 768px) {
  .card {
  padding-left: 1em;
  padding-right: 0.5em;
  border-right: 2px dotted #00aa44;
  }
}

img{
  border-radius: 7px 7px 7px 7px;
}

.one-edge-shadow {
  box-shadow: 0 8px 6px -6px black;
}

</style>