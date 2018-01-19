<template>
    <div>
        <h1>QRjs</h1>
        <video id="video" autoplay="true" style="display:none;"></video>
        <canvas id="canvas" style="width:640px; height:480px;"></canvas>
        <router-link to="/">Zurück zu Home</router-link>
    </div>
</template>

<script>

export default {
  props: [],
  data(){
      return{
        decoded: null,
        oldDecoded: null
      }
  },
  mounted() {
    console.log('Beispiel Component Geladen');

    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var width = parseInt(canvas.style.width);
    var height = parseInt(canvas.style.height);
    canvas.width = width;
    canvas.height = height;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia){
      function successCallback(stream){
        if (window.webkitURL) {
          video.src = window.webkitURL.createObjectURL(stream);
        } else if (video.mozSrcObject !== undefined) {
          video.mozSrcObject = stream;
        } else {
          video.src = stream;
        }
      }
      function errorCallback(){}
      navigator.getUserMedia({video: true}, successCallback, errorCallback);
      requestAnimationFrame(tick);
    }

    function tick() {
      requestAnimationFrame(tick);
      if (video.readyState === video.HAVE_ENOUGH_DATA){
        // Load the video onto the canvas
        context.drawImage(video, 0, 0, width, height);
        // Load the image data from the canvas
        var imageData = context.getImageData(0, 0, width, height);
        var decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height);
        if(decoded) {
          //alert(decoded);
          // Hier ist die Magie, unser Ergebnis
          console.log(decoded);
          saveQR(decoded);
        }
      }
    }

    var saveQR = (decoded) => {
      console.log('Decoded vs Olddecoded', [decoded, this.oldDecoded]);
      if(decoded != this.oldDecoded){

        console.log('way to save');
        this.decoded = decoded;
        // Speichern in den Store
        this.$store.commit('updateQR', decoded);








        // In SQL Datenbank speichern
        // http://localhost:1337/newQR?value=qrstuff
        var postInfo = {
            url: "http://localhost:1337/newQR?value="+decoded,
        }
        console.log('Send QR Data', postInfo.url);
        // Schreibe die Daten
        this.$store.commit('sendToAPI', postInfo);



        this.oldDecoded = decoded;

      }
    }

  }
  ,components: {

  },
  methods:{

  }
}
</script>

<style scoped>

</style>
