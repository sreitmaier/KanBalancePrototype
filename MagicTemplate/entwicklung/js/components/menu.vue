<template>
<div>
     <div class = "logo">
  
<img src="/src/img/Log_small.png">
<img src="/src/img/KB_small.png">
</div>

    <div class = "vertical-menu">
    <a href="#" class="active">Übersicht</a>
   <a href="#">Kalender</a>
  <a href="#">Fortschritt</a>
  <a href="#">Archiv</a>
</div>


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

    background: #E2E4E6;
}

a {
    font-family: "Quicksand-Regular";
}

.logo {
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
    background: rgb(78, 78, 78); 
    width: 200px; /* Set a width if you like */
}

.vertical-menu {
    width: 230px; /* Set a width if you like */
    height: 100vh;
    background:rgb(78, 78, 78); 
    text-align: center;
}

.vertical-menu a {
    background-color: #eee; /* Grey background color */
    color: black; /* Black text color */
    display: block; /* Make the links appear below each other */
    padding: 12px; /* Add some padding */
    text-decoration: none; /* Remove underline from links */
}

.vertical-menu a:hover {
    background-color: #ccc; /* Dark grey background on mouse-over */
}

.vertical-menu a.active {
    background-color: rgb(0, 0, 0); /* Add a green color to the "active/current" link */
    color: white;
}





</style>
