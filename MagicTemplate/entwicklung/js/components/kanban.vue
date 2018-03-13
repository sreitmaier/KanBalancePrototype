<template>
<div>
    <div id="myKanban">
    </div>

    <div class="updateButton" @click="updateKanban()">
        Board aktualisieren
    </div>
</div>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            kanbanObject: {},
            oldQRarray: [],
        }
    },
    mounted() {
        console.log('Kanban Component Geladen');



        // Get strange scope of the jkanban instance in our component with help from Max Brandl 
        this.kanbanObject = new jKanban({
            element: '#myKanban',
            gutter: '0px',
            widthBoard: '250px',
            click: function (el) {
                //console.log("Trigger on all items click!");
            },
            dropEl: function (el, target, source, sibling) {
                //console.log("Now would be good moment to be dropped and saved"); 



            },

            boards: [{
                    "id": "_wish",
                    "title": "Ziele",
                    "class": "wish",

                    "item": [{
                            "id": "_test_delete",
                            "title": "Urlaub planen",

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
                    "item": [{
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
                    "title": "In Bearbeitung",
                    "class": "todo",
                    "item": [{
                            "title": "Zeitplan machen",
                        },


                    ]
                },

                {
                    "id": "_working",
                    "title": "Geschafft",
                    "class": "todo",
                    "item": [{
                            "title": "Urlaubsantrag",
                        },
                        {
                            "title": "Emma Metzler mit Michael",
                        },
                        {
                            "title": "Eröffnung Jil Sander",
                        },
                        {
                            "title": "Handyvertrag erneuern",
                        },
                        {
                            "title": "Abo BahnCard kündigen",
                        },


                    ]
                },

            ]
        });




    },
    components: {

    },
    methods: {


        // UPDATE FUNCTION FOR KANBAN BOARD
        updateKanban() {





            var newQRs;

            //is there is more than one entry -- we need that because we want to compare .... 
            if (this.oldQRarray.length != 0) {

                // FILTER FUNCTION  with help from Max Brandl 
                // store array of qrCodes wird mit this.oldQRarray verglichen
                newQRs = this.$store.state.qrCodes.filter((element) => {
                    //boolean to show if there are new QRCodes 
                    var isNew = true;
                    //
                    this.oldQRarray.forEach((oldElement) => {
                        if (element.QR === oldElement.QR) {
                            //boolean set to false to show no newQR exists
                            isNew = false;
                        }

                    })

                    return isNew;

                });

                this.oldQRarray = this.$store.state.qrCodes;

            } else {
                newQRs = this.$store.state.qrCodes;
                this.oldQRarray = this.$store.state.qrCodes;
            }

            newQRs.forEach((element) => {

                this.kanbanObject.addElement(
                    "_working", {
                        "title": element.QR,
                    }
                );

            });



        }
    }
}



</script>




<style scoped>
.updateButton {
    background-color: #555555;
    border: none;
    width: 140px;
    height: 20px;
    margin-left: 20px;
    margin-bottom: 15px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
/* Add life to the buttons
.updateButton:hover {
    background-color: #424242
}

.updateButton:active {
    background-color: #424242;
    transform: translateY(2px);
}
 */

</style>
