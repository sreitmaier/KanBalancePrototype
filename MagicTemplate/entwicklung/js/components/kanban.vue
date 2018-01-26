<template>
    <div>
        
        <div id="myKanban">

        </div>
        <div @click="updateKanban()">
            Udpate Kanban
        </div>
    </div>
</template>

<script>

export default {
  props: [],
  data(){
      return{
          message: 'Hello World',
          kanbanObject: {}
      }
  },
  mounted() {
    console.log('Kanban Component Geladen');

    var stringKanban; 
    var SendKanban = () => {
        //console.log('sdfasdfgasdfasdfasdfgdfsgdsfgsdfgsfd');
        var currentBoards = this.kanbanObject.options.boards;
        stringKanban = JSON.stringify(currentBoards);
        //console.log('dasdfasdasdasd', stringKanban)
        this.sendKanbanToServer(stringKanban);
    }

    this.getKanbanFromServer();

    this.kanbanObject = new jKanban({
        element: '#myKanban',
        gutter: '0px',
        widthBoard: '300px',
        click: function (el) {
            //console.log("Trigger on all items click!");
        },
        dropEl: function (el, target, source, sibling) {
            console.log("Now would be good moment to be dropped and saved"); 

        // UPLOAD/SET currentBoards auf SQL Server
        SendKanban();
        // var test = [bla, bla, bla];
        // var stringTest = test.toString()
        // StringTest "[bla,bla,bla]"

        // DOWNLOAD/GET current Boards
        // Update:
        // KanbanTest.options.boards = currentBoards
        console.log('!!!!!!!!!!! This Boards Inside',this.boards)
        },

        boards: [
        {
        "id": "_wish",
        "title": "Zukunftsträume ",
        "class": "wish",
    
        "item": [
            {
                "id": "_test_delete",
                "title": "Try drag this",
                "drag": function (el, source) {
                    //console.log("START DRAG: " + el.dataset.eid);
                },
                "dragend": function (el) {
                    //console.log("END DRAG: " + el.dataset.eid);
                },
                "drop": function(el){
                    //console.log('DROPPED: ' + el.dataset.eid )
                }
            },
            {
                "title": "Try Click This!",
                "click": function (el) {
                    alert("click");
                },
            },

            {
                "title": "Run?",
            },


        ]
},
{
    "id": "_working",
    "title": "To Dos",
    "class": "todo",
    "item": [
        {
            "title": "Do Something!",
        },
        {
            "title": "Run?",
        },
    
    ]
},
]
});




  }
  ,components: {

  },
  methods:{
      hallo(){
          console.log('Hallo Geklicked');
      },
      sendKanbanToServer(kanbanString){
        
        var postInfo = {
            url: "http://localhost:1337/newKanban?value="+kanbanString,
        }
        console.log('Send Kanban Data', postInfo.url);
        // Commit to Store in index file, call mutations method sendToAPI
        this.$store.commit('sendToAPI', postInfo);

      },
      getKanbanFromServer(){

        var postInfo = {
            name: "Kanban",
            url: "http://localhost:1337/getKanban",
        }

        this.$store.commit('getFromAPI', postInfo);

      },
      updateKanban(){
          console.log('UPDATE KANBAN', this.kanbanObject);
          this.getKanbanFromServer();
          this.kanbanObject.options.boards = this.$store.state.Kanban;
      
      }
  }
}
</script>

<style scoped>
   
</style>
