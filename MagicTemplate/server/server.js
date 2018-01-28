// Für Webserver
let express = require('express');
let app = express();
var path = require('path');

// Für Datenbank
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('SQLdatenbank.db');

// Home
app.use('/', express.static('../public'));

// Unterverzeichnisse 
app.get('/QR', (req, res) => {
    // res.send('../QR-Code-Server');
    // res.sendFile(path.join(__dirname + '/index.html'));
    console.log(__dirname);
    res.sendFile(path.join(__dirname + '/QR-Code-Server/index.html'));
    
});

/*

// "API"

// Bekomme User mit Lieblingszahl OLD
// http://localhost:1337/lieblingszahl?query=100
app.get('/Lieblingszahl', (req, res) => {
    db.all('SELECT * FROM Lieblingszahlen WHERE Lieblingszahl = ?', req.query.query, (err, rows) => {
        if (!err) {
            console.log(req.query.query)
            console.log(rows)
            //res.send(JSON.stringify(rows));
            res.send(rows);
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
});

// Neuer User OLD
// http://localhost:1337/newUser?name=Hundi&nachname=Welpen&Lieblingszahl=100
app.post('/newUser', (req, res) => {
    console.log(req.query);

    // Erlaube nur Zugriffe von dieser URL
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');

    db.run('INSERT INTO Lieblingszahlen (Name, Nachname, Lieblingszahl) VALUES (?, ?, ?)', [req.query.name, req.query.nachname, req.query.Lieblingszahl], (err) => {
        if (!err) {
            res.send(200,'Nutzer Gespeichert');
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
        
    });
    
});

*/

// SAVE QR
// http://localhost:1337/newQR?value=Hundi
app.post('/newQR', (req, res) => {
    //console.log(req.query);
    

    // Erlaube nur Zugriffe von dieser URL
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');

    db.run('INSERT INTO QRCodes (QR) VALUES (?)', [req.query.value], (err) => {
        if (!err) {
            //res.send(200,'QR Gespeichert');
            res.status(200).send('QR Gespeichert')
          
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
    
});

// GET QR
// http://localhost:1337/getQR
app.get('/getQR', (req, res) => {
    db.all('SELECT * FROM QRcodes', (err, rows) => {
        if (!err) {
            console.log(rows)
            //res.send(JSON.stringify(rows));
            res.send(rows);
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
});

// SAVE KANBAN
// http://localhost:1337/newKanban?value=Hundi
app.post('/newKanban', (req, res) => {
    //console.log(req.query);
    

    // Erlaube nur Zugriffe von dieser URL
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1337');

    db.run('INSERT INTO Kanban (data) VALUES (?)', [req.query.value], (err) => {
        if (!err) {
            //res.send(200,'QR Gespeichert');
            //console.log('Kanban gespeichert', req.query.value);
            res.status(200).send('Kanban Gespeichert')
          
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
    
});

// GET KANBAN
// http://localhost:1337/getKanban
app.get('/getKanban', (req, res) => {
    db.all('SELECT * FROM Kanban', (err, rows) => {
        if (!err) {
            console.log(rows)
            //res.send(JSON.stringify(rows));
            res.send(rows);
        } else {
            res.send('Etwas ist schief gegangen', err);
        }
    });
});

// Starte Webserver
app.listen(1337, () => {
    console.log('http://localhost:1337');
});