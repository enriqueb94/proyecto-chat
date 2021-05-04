const express = require('express');
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer,{
  cors: {
    origin: "http://localhost:6677",
    methods: ["GET", "POST"],
    allowedHeaders: ["Socket.io"],
    credentials: true
  }
});

app.use(express.static('client'));

var mensajes = [{
  id: 1,
  text: 'bienvenido al chat privado de socket.io y node.js',
  nickname: 'bot-enrique'
}]

io.on("connection", (socket) => {
  console.log('El cliente con IP: '+socket.handshake.address+' se ha conectado');

  socket.emit('mensajes',mensajes);
  
  socket.on('add-message', (data) => {
    mensajes.push(data);
    io.sockets.emit('mensajes',mensajes);
  });
});



app.get('/hola-mundo',(req,res)=>{
    res.status(200).send('hola mundo');
})

httpServer.listen(6677, ()=>{
    console.log('Servidor corriendo en el puerto 6677');
});

