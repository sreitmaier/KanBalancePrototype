<template>

<div class="container">

    <div v-if="isVideoOpen" class="modalQR">
        <QRServer @close="isVideoOpen = false"></QRServer>
    </div>

    <div class="sidebar">
        <Menu></Menu>
    </div>

    <div class="content">
        <Kanban></Kanban>
        <div class="addButton" @click="isVideoOpen = true">QR scannen</div>
    </div>

</div>
</template>

<script>
import Menu from './components/Menu.vue';
import Kanban from './components/kanban.vue';
import QRServer from './components/qrServer.vue';


export default {


    props: [],



    data() {
        return {
            test: 'hallo',
            isVideoOpen: false
        }
    },

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

    },
    components: {

        Menu,
        Kanban,
        QRServer

    },
    methods: {

    }
}
</script>

<style scoped>

.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.sidebar {
    height: 100vh;
    width: 300px;
}

.content {
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

.done {
    background: #E2E4E6;
}

.modalQR {
    background: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 20000;
    display: flex;
    justify-content: center;
    cursor: pointer;
}

.addButton {
    background-color: #cccccc;
    width: 140px;
    height: 20px;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 20px;
}
/* Add life to the buttons

.addButton:hover {background-color: #c2c2c2}

.addButton:active {
  background-color: #c2c2c2;

  transform: translateY(2px);
}
*/

</style>
