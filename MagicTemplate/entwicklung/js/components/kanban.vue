<template>
    <div>
        <h1>Kanban</h1>
        <div id="myKanban">

        </div>
    </div>
</template>

<script>

export default {
  props: [],
  data(){
      return{
          message: 'Hello World',
      }
  },
  mounted() {
    console.log('Kanban Component Geladen');


    var KanbanTest = new jKanban({
        element: '#myKanban',
        gutter: '0px',
        widthBoard: '300px',
        click: function (el) {
            console.log("Trigger on all items click!");
        },
        dropEl: function (el, target, source, sibling) {
            console.log("Now its dropped and saved"); 

        // UPLOAD/SET currentBoards auf SQL Server
        var currentBoards = KanbanTest.options.boards;
        console.log('Boards', currentBoards);

        // var test = [bla, bla, bla];
        // var stringTest = test.toString()
        // StringTest "[bla,bla,bla]"

        // DOWNLOAD/GET current Boards
        // Update:
        // KanbanTest.options.boards = currentBoards
        },

       
        boards: [
                        {
                "id": "_wish",
                "title": "Wunschträume ",
                "class": "wish",
              
                "item": [
                    {
                        "id": "_test_delete",
                        "title": "Try drag this",
                        "drag": function (el, source) {
                            console.log("START DRAG: " + el.dataset.eid);
                        },
                        "dragend": function (el) {
                            console.log("END DRAG: " + el.dataset.eid);
                        },
                        "drop": function(el){
                            console.log('DROPPED: ' + el.dataset.eid )
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
                "title": "Working",
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
  }
}
</script>

<style scoped>
    h2{
        color: #3be547;
    }
</style>
