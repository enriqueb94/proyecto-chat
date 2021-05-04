var socket = io.connect('http://192.168.1.181:6677',{'forceNew':true});
var mensajes = document.querySelector('#mensajes');

socket.on('mensajes', (data) => {
    console.log(data);
    render(data);
});

function render(data){
    data.forEach((element,index) => {
        //creando elementos que componen el mensaje
        let divMensaje = document.createElement('div');
        divMensaje.classList.add('mensaje');
        let h3 = document.createElement('h3');
        let span = document.createElement('span');
        //adheriendo informacion a los elementos que componen el mensaje
        h3.append(element.nickname);
        span.append(element.text);
        divMensaje.append(h3);
        divMensaje.append(span);
        mensajes.append(divMensaje);
    });

    let div_mensajes = document.getElementById('mensajes');
    div_mensajes.scrollTop = div_mensajes.scrollHeight
}

function addMensaje(e){
    let mensaje = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    socket.emit('add-message', mensaje);
    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').value = '';
    document.getElementById('text').focus();
    return false;
}