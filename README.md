# sy_node_rpc
一个node rpc框架

[![npm package](https://nodei.co/npm/sy_node_rpc.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sy_node_rpc/)

### Getting Started
```shell
$ npm install sy_node_rpc --save
```

### Server
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


### Client
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
