<template>
    <div>
        <p>Hallo Welt, ich bin eine 2.Component</p>
        
    </div>
</template>

<script>

export default {
  props: [],
  
  data(){
      return{

      }
  },

  mounted() {
      console.log('Tryit Component Geladen');
      
  },
  components: {
   
  },
 
    
  
}
</script>

<style scoped>
p {
    font-family: verdana;
    font-size: 20px;
   color: rgb(255, 0, 85);

}

</style>
