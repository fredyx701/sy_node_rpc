const Service = require('./service');
const net = require('net');
const HEAD = require('./head');


class Client extends Service {

    constructor(host, port) {
        super();
        this.closed = false;
        this.askId = 0;
        this.client = new net.Socket();
        this.client.on('connect', this._connectHandler.bind(this));
        this.client.on('close', this._closeHandler.bind(this));
        this.client.on('data', this._dataHandler.bind(this));
        this.client.on('error', this._errorHandler.bind(this));
        this.client.on('warn', this._warnHandler.bind(this));
        this.client.connect({
            host: host,
            port: port
        });
    }


    rpcRequest(serviceName, body) {
        const header = this._getHeader(serviceName, {flag: HEAD.FLAG.RPC});
        this.client.write(this.encode(header, body));
    };


    eventRequest(serviceName, body) {
        const header = this._getHeader(serviceName, {flag: HEAD.FLAG.EVENT});
        this.client.write(this.encode(header, body));
    };


    _getHeader(serviceName, opt) {
        this.askId = ++this.askId % 2147483648;   // 2 ^ 31
        return Object.assign({
            service_sign: encode(serviceName),
            askId: this.askId,
        }, opt);
    }


    destroy() {
        if (!this.closed) {
            this.closed = true;
            this.client.destroy();
        }
        this.removeAllListeners();
    };


    _connectHandler() {
        this.emit('connect');
    };

    _closeHandler() {
        this.emit('close');
    };

    _dataHandler(buffer) {
        const msgs = this.decode(buffer);
        for (let msg of msgs) {
            const {header, body} = msg;
        }
    };

    _errorHandler(error) {
        this.emit('error', error);
    };

    _warnHandler(msg) {
        this.emit('warn', msg);
    }
}


module.exports = Client;