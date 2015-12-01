var stompClient = null;

function setConnected(connected) {
    alert("OK");
}

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (serverMessage) {
            showServerMessage(JSON.parse(serverMessage.body).content);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
    stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    var message = document.getElementById('message').value;
    stompClient.send("/app/message", {}, JSON.stringify({ 'message': message }));
}

function showServerMessage(message) {
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    response.appendChild(p);
}

function init() {
//   var btnSend = document.getElementById('send');
//   btnSend.onclick=sendMessage;
   
    var btnJoin = document.getElementById('joinG');
    btnJoin.onclick=connect;
    var btnCreate = document.getElementById('createG');
    btnCreate.onclick=connect;
    
    var tbl= document.getElementById("tableBoard");
    var i, j;
    
    for (i=0;i<10;i++){
        for (j=0;j<10;j++){
            var image = document.getElementById("cell"+i+j);
            image.onclick = setConnected(true);
        }
    }
    
//   var btnDisconnect = document.getElementById('disconnect');
//   btnDisconnect.onclick=disconnect;
    disconnect();
}

window.onload = init;