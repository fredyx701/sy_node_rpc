# sy_node_rpc
一个node rpc框架


### server
```javascript
const net = require('net');
const JSONSocket = require('sy_node_rpc').JSONSocket;

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
```


### client
```javascript
const JSONSocket = require('sy_node_rpc').JSONSocket;

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
```
