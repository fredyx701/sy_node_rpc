const protobuf = require('protobufjs');

protobuf.load('./helloworld.proto', async function (err, root) {
    if (err) {
        throw err;
    }

    let Greeter = root.lookupService('helloworld.Greeter');
    let HelloRequest = root.lookupType('helloworld.HelloRequest');
    let HelloReply = root.lookup('HelloReply', true);

    function rpcImpl(method, requestData, callback) {
        let err = HelloRequest.verify(requestData);
        if (err) {
            console.error(err);
        }
        let message = HelloRequest.decode(requestData);
        message = HelloRequest.toObject(message);
        console.log(message);
        const data = {
            message: 'hello ' + message.name,
            id: message.id,
            field: 6
        };
        let responseData = HelloReply.create(data);
        callback(null, HelloReply.encode(responseData).finish());
    }

    const greeter = Greeter.create(rpcImpl);

    greeter.sayHello({name: 'callback', id: [1, 2]}, function (err, response) {
        console.log('Callback Greeting:', response);
    });

});


//promise
void async function () {
    try {
        const root = await protobuf.load('./helloworld.proto');
        let Greeter = root.lookupService('Greeter');
        const greeter = Greeter.create(rpcImpl);
        let response = await greeter.sayHello({name: 'promise', id: null});
        console.log('Promise Greeting:', response);
    } catch (err) {
        console.error(err);
    }
}();


function rpcImpl(method, requestData, callback) {
    const root = method.root;
    const requestType = root.lookup(method.requestType);
    const responseType = root.lookup(method.responseType);

    let err = requestType.verify(requestData);
    if (err) {
        console.error(err);
    }
    let message = requestType.decode(requestData);
    message = requestType.toObject(message);
    console.log(message);
    const data = {
        message: 'hello ' + message.name,
        id: message.id,
        field: 6
    };
    let responseData = responseType.create(data);
    callback(null, responseType.encode(responseData).finish());
}