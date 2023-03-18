const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//conectamos mongoDB
require('./conecciones/mongoCompas');
//UTILS
let fecha = require("./utils/fecha");
//API
const api = require("./api/mongo")
//DOTENV
const dotenv = require('dotenv').config();
//MIDLEWARE
//const loginMiddleware = require("./utils/midleware");

//Fecha Cliente
let fechaCliente = require("./utils/fechaCliente");


//Iniciamos Web Socket
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

//HandleBars
const handlebars = require('express-handlebars');
const { json } = require('express');
const { async } = require('rxjs');
const { nextTick, mainModule } = require('process');
const { watchOptions } = require('nodemon/lib/config/defaults');
const { Mongoose, mongo } = require('mongoose');

//Carpeta public
app.use(express.static('./public'));

//RUTA
app.get('/', (req, res) => {
    res.sendFile('client/indexx.html', {root: __dirname });
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/singup', (req, res) => {
    res.redirect("/");
});

//WEBSOCKET
io.on('connect', socket => {  
   
    socket.emit("action", "capri123")

    socket.on("newSession", fecha => {
        (async () => {
            const data = await api.leer(fecha); 
            socket.emit("start", data[0]);
        })();
    })

    socket.on("nuevaVenta", data => {
        (async () => {
           await api.ingresarVenta(data);
           await api.ventasMensuales(data);
           const recarga = await api.leer(data.fecha);
           socket.emit("start", recarga[0]);
        })();
    });
})

app.get("/total", (req, res) => {
    res.send("TOTAL DEL DIA: " + resultDiarioTotal)
})

http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});
// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
});