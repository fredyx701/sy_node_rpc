const HEAD = require('./head');

class Response {

    constructor(header, body, socket) {
        this.header = header;
        this.body = body;
        this._socket = socket;
    }

    send(body) {
        if (this.header.flag !== HEAD.FLAG.RPC) {
            return;
        }
        this.header.flag = HEAD.FLAG.RPC_RES;
        this._socket.rpcResponse(this.header, body);
    }
}


module.exports = Response;