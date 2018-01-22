<template>
    <div>
        <h1>KanBalance</h1>
        <h2>QR Codes</h2>
        <div v-for="(qr, index) in this.$store.state.qrCodes" :key="index">
            {{qr.QR}}
        </div>

    </div>
</template>

<script>


export default {
  props: [],
  data(){
      return{
        test: 'hallo',
      }
  },
  //Wenn das Kompenent geladen ist, nimm den Code in mounted
  mounted() {

    console.log('Beispiel Component Geladen');

    // Frage die Datenbank in einem Intervall von drei Minuten nach neuen Codes ab 
    setInterval(() => { 

        console.log('Tick... Tack');
        
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
  },
  methods:{
      
  }
}
</script>

<style scoped>

</style>
