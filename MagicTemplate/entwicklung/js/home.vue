<template>
    <div class = "container">
        
        <div class="sidebar">
            <Menu></Menu> 
        </div>

        <div class="content">
            <Kanban></Kanban> 
                   <h2>QR Codes</h2>
        <div v-for="(qr, index) in this.$store.state.qrCodes" :key="index">
            {{qr.QR}}
        </div>
            
            
         <router-link to="/QR">Sync QRs</router-link>
        </div>
        
       <div>
 
        </div>
       

    </div>
</template>

<script>

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
      
      Menu,
      Kanban 
      
  },
  methods:{
      
  }
}
</script>

<style scoped>

div {
    background: #E2E4E6; 
    font-family: "Quicksand-Regular";
}

.container {
            height: 100%;
            width: 100%;
            
            display: flex;
            flex-direction: row;
}

.sidebar{
            
            height: 100vh;
            width: 300px;
}

.content{
            
            width: 100%;
}

h2 {
    font-family: "Quicksand-Bold";
    font-size: 20px;
   color: gray;

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
