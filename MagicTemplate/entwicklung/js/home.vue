<template>
    <div>
        <h1>KanBalance</h1>
         <Menu></Menu> 
        <Tryit></Tryit> 
        
        <h2>QR Codes</h2>
        <div v-for="(qr, index) in this.$store.state.qrCodes" :key="index">
            {{qr.QR}}
        </div>

    </div>
</template>

<script>
import Tryit from './components/Tryit.vue';
import Menu from './components/Menu.vue';


export default {
  

  props: [],



  data(){
      return{
        test: 'hallo',
      }
  },
  //Wenn das Komponent geladen ist, nimm den Code in mounted
  mounted() {

  

    // Frage die Datenbank in einem Intervall von drei Minuten nach neuen Codes ab 
    setInterval(() => { 

        
        
        // url Format das wir für den QR get request trigger brauchen:
        // http://localhost:1337/getQR

        var postInfo = {
            name: "QR",
            url: "http://localhost:1337/getQR",
        }

        this.$store.commit('getFromAPI', postInfo);

    }, 3000);


  }
  ,components: {
      Tryit,
      Menu, 
      
  },
  methods:{
      
  }
}
</script>

<style scoped>
h1 {
    font-family: verdana;
    font-size: 20px;
   color: gray

}

</style>
