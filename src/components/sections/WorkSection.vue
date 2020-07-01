<template>
<section class="section">
    <div class="container">

      <div class="title-line">
        <h1 class="title is-2">
          <!-- <i class="fas fa-pen title is-1 portfolio-font-color"></i>  -->
          Recent Works
        </h1>
      </div>
      <!-- <h2 class="subtitle portfolio-font-color">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2> -->

      <div class="bottom">
        <div class="columns is-multiline">
          <CardOneThird v-for="project in projects" :key="project.id" :image="url+project.image" :name="project.name" :description="project.description" :url="project.url" :created_at="project.created_at"></CardOneThird>        
        </div>
      </div>

    </div>
  </section>
  
</template>


<script>

  import CardOneThird from '@/components/parts/CardOneThird.vue';
  import axios from 'axios';
  import {mapGetters} from 'vuex';

  export default {
    name: 'WorkSection',
      components: {    
      CardOneThird
    },
  
  data(){
    return {
      projects : [
        // {
        //   'id' : 1,
        //   'image' : 'sky.jpg',
        //   'title' : 'Sky into The Moon',
        //   'content' : 'Lore ipsum',
        // },
        // {
        //   'id' : 2,
        //   'image' : 'aurora.jpg',
        //   'title' : 'Sky into The Moon',
        //   'content' : 'Lore ipsum',
        // },
        // {
        //   'id' : 3,
        //   'image' : 'sky.jpg',
        //   'title' : 'Sky into The Moon',
        //   'content' : 'Lore ipsum',
        // },
        // {
        //   'id' : 4,
        //   'image' : 'aurora.jpg',
        //   'title' : 'Sky into The Moon',
        //   'content' : 'Lore ipsum',
        // },
      ],
    }
  },

  created() {
    axios.get('works')
    .then(response => {            
        this.projects = response.data                                             
    })    
  },

  computed : {
    ...mapGetters({
        url: 'url'
    })
  },

}
</script>


<style>

  .title-line {    
    margin-top: 2em;
    padding-bottom: 0.7em;
    margin-bottom: 2.5em;
    /* border-bottom: 2px dotted #00aa44; */
  }

  .title-line::after {
    content: attr(data-text);;
    display: block;
    width: 90%;
    background: #00aa44;
    padding: 1px 8px;
    margin-top: 1.5em;
    margin-left: 5%;
    text-align: center;
  }

  .bottom {
    margin-bottom: 2.5em;
  }

</style>

