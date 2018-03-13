// create webserver with framework express
let express = require('express');
let app = express();
var path = require('path');

// embed sqlite and database file
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('SQLdatenbank.db');

// define home route
app.use('/', express.static('../public'));

// set sub route 
app.get('/QR', (req, res) => {
    //console.log(__dirname);
    res.sendFile(path.join(__dirname + '/QR-Code-Server/index.html'));

});



// SAVE QR IN DB 
// http://localhost:1337/newQR?value=Hello:)
app.post('/newQR', (req, res) => {
    // Only allow acces via port 1337 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');
    //sql query insert into table QRCodes
    db.run('INSERT INTO QRCodes (QR) VALUES (?)', [req.query.value], (err) => {
        if (!err) {
            //res.send(200,'QR Gespeichert');
            res.status(200).send('QR Gespeichert')

        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });

});

// GET QR FROM DB 
// http://localhost:1337/getQR
app.get('/getQR', (req, res) => {
    db.all('SELECT * FROM QRcodes', (err, rows) => {
        if (!err) {

            res.send(rows);
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
});




// start webserver 
app.listen(1337, () => {
    console.log('server is listening on http://localhost:1337');
});