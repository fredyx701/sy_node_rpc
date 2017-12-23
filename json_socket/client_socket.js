const BaseSocket = require('./base_socket');
const net = require('net');
const HEAD = require('./head');
const crc32 = require('buffer-crc32');


class ClientSocket extends BaseSocket {

    /**
     * @param options ｛｛host, port｝ or scoket, protoRoot｝
     */
    constructor(options) {
        super();
        this.closed = false;
        this.askId = 0;
        this.accepts = {};
        this.acceptMap = {};
        this.client = null;

        if (options.socket) {
            this.client = options.socket;
        } else if (options.host && options.port) {
            this.client = new net.Socket();
            this.client.connect({
                host: host,
                port: port
            });
        } else {
            throw Error('invalid options');
        }

        this.client.on('connect', this._connectHandler.bind(this));
        this.client.on('close', this._closeHandler.bind(this));
        this.client.on('data', this._dataHandler.bind(this));
        this.client.on('error', this._errorHandler.bind(this));
    }


    rpcRequest(service_name, body) {
        const header = this._getHeader(service_name, {flag: HEAD.FLAG.RPC});
        this.client.write(this.encode(header, body));
    };


    eventRequest(service_name, body) {
        const header = this._getHeader(service_name, {flag: HEAD.FLAG.EVENT});
        this.client.write(this.encode(header, body));
    };


    addHandler(service_name, callback) {
        this.acceptMap[crc32.signed(service_name)] = service_name;
        this.accepts[service_name] = {
            callback: callback instanceof Function ? callback : noop,
        };
    };

    removeHandler(service_name) {
        delete this.acceptMap[crc32.signed(service_name)];
        delete this.accepts[service_name];
    };


    _getHeader(service_name, opt) {
        this.askId = ++this.askId % 2147483648;   // 2 ^ 31
        return Object.assign({
            service_sign: encode(service_name),
            askId: this.askId,
        }, opt);
    }


    destroy() {
        if (!this.closed) {
            this.closed = true;
            this.client.destroy();
        }
        this.accepts = {};
        this.acceptMap = {};
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
}


function noop() {

}


module.exports = ClientSocket;