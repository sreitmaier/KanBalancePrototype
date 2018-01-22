<template>
    <div>
 <ul>
 <li>Item 1</li>
 <li>Item 2</li>
 <li>Item 3</li>
 <li>Item 4</li>
 <li>Item 5 we'll make a bit longer so
     that it will wrap</li>
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


</style>
