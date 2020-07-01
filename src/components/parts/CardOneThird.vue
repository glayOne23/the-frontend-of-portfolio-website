<template>
<div class="column is-one-third">
  <Card :image="image" :name="name" :description="description" :url="url" :created_at="created_at"></Card>
</div>
</template>


<script>

  import Card from '@/components/parts/Card.vue';
  
  export default {

    name: 'CardOneThird',
      props: {
      image: String,
      name: String,
      description: String,
      url: String,
      created_at: String
    },

   components: {    
      Card,      
    },
  
  }
</script>