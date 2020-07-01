<template>
<div>

  <ParticleSection></ParticleSection>
  <WorkSection></WorkSection>
  <FooterSection></FooterSection>

</div>
</template>


<script>
// @ is an alias to /src
import ParticleSection from '@/components/sections/ParticleSection.vue';
import WorkSection from '@/components/sections/WorkSection.vue';
import FooterSection from '@/components/sections/FooterSection.vue';

export default {
  name: 'Home',
  components: {
    ParticleSection,
    WorkSection,
    FooterSection,    
  }
}
</script>


<style lang="scss">

</style>