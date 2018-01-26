<template>
    <div>
        <h1>KanBalance</h1>
        <img src="/src/img/LogoKB_NoBG.png">
        <Menu></Menu> 
         <Kanban></Kanban> 
        
        <Tryit></Tryit> 
        
        <h2>QR Codes</h2>
        <div v-for="(qr, index) in this.$store.state.qrCodes" :key="index">
            {{qr.QR}}</div>
            <div></div>
         <router-link to="/QR">Sync QRs</router-link>

       

    </div>
</template>

<script>
import Tryit from './components/Tryit.vue';
import Menu from './components/Menu.vue';
import Kanban from './components/kanban.vue';


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
      Kanban 
      
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

        body {
            
            margin: 0;
            padding: 0;
            font-size: 12px;
            background:#E2E4E6;
        }

        #myKanban {
            overflow-x: auto;
            padding: 10px 0;
        }

        .wish {
            background: #E2E4E6;
        }

        .todo {
            background: #E2E4E6;
        }

        .working {
            background: #E2E4E6;
        }

        .done{
            background: #E2E4E6;
        }


</style>
