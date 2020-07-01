<template>

<div>

  <AdminNavbar></AdminNavbar>

  <div class="admin-body">    
    <AdminParticleSection></AdminParticleSection>
    <AdminWorkSection></AdminWorkSection>
    <AdminFooterSection></AdminFooterSection>
  </div>

</div>

</template>


<script>

import AdminNavbar from '@/components/parts/AdminNavbar.vue';
import AdminParticleSection from '@/components/sections/AdminParticleSection.vue';
import AdminWorkSection from '@/components/sections/AdminWorkSection.vue';
import AdminFooterSection from '@/components/sections/AdminFooterSection.vue';

export default {
  name: 'Main',
  components: {
    AdminNavbar,
    AdminParticleSection,
    AdminWorkSection,
    AdminFooterSection
  },

}
</script>


<style lang="scss">
  .admin-body {
    margin: 0;    
    background: #34393f;
    height: 100%;
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 2em;
    padding-right: 2em;
    text-align: left;
    color: white;
  }

  .table{      
    border-radius: 5px;      
  }
  
  @media only screen and (min-width: 768px) {
    .field-admin {
      padding-left: 7em;
      padding-right: 7em;
      padding-bottom: 0.5em;      
    }
    .table-container {
      padding-left: 7em;
      padding-right: 7em;
      padding-bottom: 0.5em;            
    }
  }
    
  @media only screen and (max-width: 767px) {
    .field-admin {      
      padding-right: 2em;
    }
  }

  .white{
    color: white;
  }

  .admin-color{
    color: #1AD17E;
  }

  .yellow{
    color: hsl(48, 100%, 67%);
  }

  .red{
    color: hsl(348, 100%, 61%);
  }

  .center{
    text-align: center;
  }

  .control {
    margin-bottom: 0.5em;
  }

  .mg-btm{
    margin-bottom: 0.5em;
  }

  .admin-color-button{
    background: #1AD17E;
    border: 0px;
    color : white;
  }

</style>