<template>
    <div class="QRserverInner">
        <div class="close" @click="close()">x</div>
        <div v-if="isFound" class="gefunden">
            <h1>Gefunden!</h1>
            <p>{{this.decoded}}</p>         
        </div>
        <video id="video" autoplay="true" style="display:none;"></video>
        <canvas id="canvas" style="width:640px; height:480px;"></canvas>
    </div>
</template>

<script>

export default {
  props: [],

  data(){
      return{
        decoded: null,
        oldDecoded: null,
        isFound: false
      }
  },

  mounted() {
      /////// NUR FÜR TRENNUNG VON HOMR
        var postInfo = {
            name: "QR",
            url: "http://localhost:1337/getQR",
        }

        this.$store.commit('getFromAPI', postInfo);
        console.log('QR UPDATE STORE?', this.$store.state.qrCodes);
        console.log('STORE?', this.$store.state);
      /////////////

    console.log("QR Component geladen")
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
         
          // Our QR Code
          console.log(decoded);
          saveQR(decoded);
        }
      }
    }
//pass the qr code to this function, commit to store methods
    var saveQR = (decoded) => {

      //console.log('Decoded vs Olddecoded', [decoded, this.oldDecoded]);
      if(decoded != this.oldDecoded){

        console.log('way to save');

        this.decoded = decoded;
        var isDuplicate = false;

        this.$store.state.qrCodes.forEach((element) => {
            if(element.QR === decoded){
                console.log('Vergleich Same', [element.QR, decoded])
                isDuplicate = true;
            }
            console.log('Vergleich', [element, decoded])
        })
        
        if(!isDuplicate){
          this.isFound = true;
          // Commit to Store in index file, call mutations method updateQR
          this.$store.commit('updateQR', decoded);

          // Save in SQL
          // Reference Url http://localhost:1337/newQR?value=qrstuff in variable postinfo
          
          var postInfo = {
              url: "http://localhost:1337/newQR?value="+decoded,
          }
          //console.log('Send QR Data', postInfo.url);
          // Commit to Store in index file, call mutations method sendToAPI
          this.$store.commit('sendToAPI', postInfo);
          
        }

        //reset decoded
        this.oldDecoded = decoded;

      }
    }

  }
  ,components: {

  },
  methods:{
    close(){
      console.log('Close Clicked', this.$emit);
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

.QRserverInner {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Quicksand-Regular';
}

.gefunden {
    position: absolute;
    color: #ffffff;
}

.gefunden h1 {
    color: #419e51;
    text-align: center;
    font-size: 70px;
}

.gefunden p {
    font-size: 50px;
}

.close{
    background: #fff;
    border-radius: 360px;
    position: absolute;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    z-index: 999999;
    margin-top: -240px;
    margin-left: 320px;
}

</style>
