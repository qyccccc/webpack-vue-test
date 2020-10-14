<template>
  <div>
    <div>
      404
    </div>
  </div>
</template>

<script>
 // import img_404 from '@/assets/images/gif_404.gif';

  export default {
    name: 'wrongPage',
    data() {
      return {
        
      }
    },
    methods: {
      handleGoMain() {
        this.$router.push({path: '/'})
      }
    },
  }
</script>

<style scoped>


</style>
