<template>
    <div>
        <img src="/src/img/Log_small.png">
        <img src="/src/img/KB_small.png">
 <ul>
 <li>Übersicht</li>
 <li>Kalender</li>
 <li>Fortschritt</li>
 <li>Archiv</li>
 </ul>
        
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
      console.log('Menu Component Geladen');
      
  },
  components: {
   
  },
 
    
  
}
</script>

<style scoped>
div {
    background: lightgrey
}



</style>
