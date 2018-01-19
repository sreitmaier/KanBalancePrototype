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
// IMPORT COMPS

export default {
  props: [],
  data(){
      return{
        test: 'hallo',
      }
  },
  //When element is loaded, do mounted
  mounted() {

    console.log('Beispiel Component Geladen');

    // UPDATE INTERVALL (3000ms = 3sec)
    setInterval(() => { 

        console.log('Tick... Tack');
        
        // Format das wir für QR brauchen:
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
