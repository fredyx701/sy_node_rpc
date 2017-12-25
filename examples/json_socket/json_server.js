const net = require('net');
const JSONSocket = require('../../index').JSONSocket;

const server = net.createServer(function (socket) {
    socket = new JSONSocket({socket: socket});

    console.log('client connected', socket.remoteAddress);

    socket.addHandler('test.example', function (res) {
        console.log(res.body);
        res.send({words: 'world'});
    });

    socket.on('error', (err) => {
        console.error(err);
    });

    socket.on('close', () => {
        console.log('socket is close');
    });
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(3101, () => {
    console.log('server bound');
});