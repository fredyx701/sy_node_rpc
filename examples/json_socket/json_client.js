const JSONSocket = require('../../index').JSONSocket;

const socket = new JSONSocket({host: 'localhost', port: 3101});

socket.on('connect', function () {
    console.log('client connected');

    socket.rpcRequest('test.example', {words: 'hello'}, function (err, body) {
        if (err) {
            return console.error(err);
        }
        console.log(body);
    });
});


socket.on('error', (err) => {
    console.error(err);
});

socket.on('close', () => {
    console.log('socket is close');
});
