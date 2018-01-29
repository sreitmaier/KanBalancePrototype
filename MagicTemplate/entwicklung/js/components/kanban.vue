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
          kanbanObject: {},
          oldQRarray: []
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
        widthBoard: '250px',
        click: function (el) {
            //console.log("Trigger on all items click!");
        },
        dropEl: function (el, target, source, sibling) {
            //console.log("Now would be good moment to be dropped and saved"); 

        // UPLOAD/SET currentBoards auf SQL Server
        SendKanban();
        // var test = [bla, bla, bla];
        // var stringTest = test.toString()
        // StringTest "[bla,bla,bla]"

        // DOWNLOAD/GET current Boards
        // Update:
        // KanbanTest.options.boards = currentBoards
        //console.log('!!!!!!!!!!! This Boards Inside',this.boards)
        },

        boards: [
        {
        "id": "_wish",
        "title": "Ziele",
        "class": "wish",
    
        "item": [
            {
                "id": "_test_delete",
                "title": "Urlaub planen",
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
                "title": "Achtsamkeitskurs",
            },


        ]
},
{
    "id": "_working",
    "title": "To Dos",
    "class": "todo",
    "item": [
        {
            "title": "Impfpass finden",
        },
        {
            "title": "Flug buchen",
        },
         {
            "title": "Bestellung Buch abholen",
        },
    
    ]
},

{
    "id": "_working",
    "title": "Doing",
    "class": "todo",
    "item": [
        {
            "title": "Hotel buchen",
        },
       
    
    ]
},

{
    "id": "_working",
    "title": "Geschafft",
    "class": "todo",
    "item": [
        {
            "title": "Urlaubsantrag",
        },
        {
            "title": "Emma Metzler mit Michael",
        },
          {
            "title": "Eröffnung Jil Sander",
        },
           {
            "title": "Handyvertrag erneueren",
        },
             {
            "title": "Abo BahnCard kündigen",
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
        //console.log('Send Kanban Data', postInfo.url);
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
          //console.log('UPDATE KANBAN', this.kanbanObject);
        
        this.getKanbanFromServer();

        console.log('diff1', this.oldQRarray);
        console.log('diff2', this.$store.state.qrCodes);

        var newQRs;

        if(this.oldQRarray.length != 0){

            // FILTER FUNKTION
            // this.$store.state.qrCodes wird mit this.oldQRarray verglichen
            newQRs = this.$store.state.qrCodes.filter((element) => {

                var isNew = true;
                
                this.oldQRarray.forEach((oldElement) => {
                    if(element.QR === oldElement.QR){
                        isNew = false;
                    }
                    console.log('Filter', [element, oldElement, isNew])
                })
                
                return isNew;

            });

            this.oldQRarray = this.$store.state.qrCodes;

        } else {
            newQRs = this.$store.state.qrCodes;
            this.oldQRarray = this.$store.state.qrCodes;
        }
        
        newQRs.forEach((element) => {

            console.log('qr in for each', element.QR);

            this.kanbanObject.addElement(
                "_wish",
                {
                    "title": element.QR,
                }
            );

        });

        //this.kanbanObject.options.boards = this.$store.state.Kanban;
      
      }
  }
}


/* 
KanbanTest.addElement(
            "_todo",
            {
                "title": "Test Add",
            }
        );
        */
</script>




<style scoped>





   
</style>
