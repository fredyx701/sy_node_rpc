const BaseSocket = require('./base_socket');
const net = require('net');
const HEAD = require('./head');
const Response = require('./response');
const crc32 = require('buffer-crc32');


class ClientSocket extends BaseSocket {

    /**
     * @param options ｛｛host, port｝ or scoket｝
     */
    constructor(options) {
        super();
        this.closed = false;
        this.askId = 0;
        this.accepts = new Map();
        this.acceptMap = new Map();
        this.rpcs = new Map();
        this.client = null;

        if (options.socket) {
            this.client = options.socket;
        } else if (options.host && options.port) {
            this.client = new net.Socket();
            this.client.connect({
                host: options.host,
                port: options.port
            });
        } else {
            throw Error('invalid options');
        }

        this.remoteAddress = this.client.remoteAddress;

        this.client.on('connect', this._connectHandler.bind(this));
        this.client.on('close', this._closeHandler.bind(this));
        this.client.on('data', this._dataHandler.bind(this));
        this.client.on('error', this._errorHandler.bind(this));
    }


    /**
     * 发起rpc 请求
     * @param service_name    服务名
     * @param body            请求内容
     * @param callback        rpc回调
     * @param timeout         超时时间 默认 3000ms
     */
    rpcRequest(service_name, body, callback, timeout) {

        if (typeof callback !== 'function') {
            throw Error('callback is not a function');
        }

        const header = this._getHeader(service_name, {flag: HEAD.FLAG.RPC});
        this.client.write(this.encode(header, body));

        const askId = header.askId;

        //超时处理
        const timer = setTimeout(() => {
            const error = new Error('timeout');
            error.message_body = {
                service_name: service_name,
                header: header,
                body: body,
            };
            if (!this.rpcs.has(askId)) {
                return;
            }
            this.rpcs.get(askId).callback(error);
            this.rpcs.delete(askId);
        }, timeout || 3000);

        this.rpcs.set(askId, {
            service_sign: header.service_sign,
            service_name: service_name,
            callback: callback,
            timer: timer
        });
    };


    /**
     * 发起event消息推送
     * @param service_name
     * @param body
     */
    eventRequest(service_name, body) {
        const header = this._getHeader(service_name, {flag: HEAD.FLAG.EVENT});
        this.client.write(this.encode(header, body));
    };


    /**
     * rpc响应
     */
    rpcResponse(header, body) {
        this.client.write(this.encode(header, body));
    }


    _dataHandler(buffer) {
        const msgs = this.decode(buffer);
        for (const {header, body} of msgs) {
            if (header.flag === HEAD.FLAG.RPC_RES) {

                const askId = header.askId;
                if (!this.rpcs.has(askId)) {
                    continue;
                }
                const rpcInfo = this.rpcs.get(askId);
                this.rpcs.delete(askId);
                clearTimeout(rpcInfo.timer);
                rpcInfo.callback(null, body);

            } else if (header.flag === HEAD.FLAG.RPC || header.flag === HEAD.FLAG.EVENT) {

                if (!this.acceptMap.has(header.service_sign)) {
                    continue;
                }
                const service_name = this.acceptMap.get(header.service_sign);
                if (!this.accepts.has(service_name)) {
                    continue;
                }

                const accept = this.accepts.get(service_name);
                accept.callback(new Response(header, body, this));
            }
        }
    };


    /**
     * 设置消息监听
     * @param service_name
     * @param callback
     */
    addHandler(service_name, callback) {
        if (typeof callback !== 'function') {
            throw Error('callback is not a function');
        }
        this.acceptMap.set(crc32.signed(service_name), service_name);
        this.accepts.set(service_name, {callback: callback});
    };


    /**
     * 移除消息监听
     * @param service_name
     */
    removeHandler(service_name) {
        this.acceptMap.delete(crc32.signed(service_name));
        this.accepts.delete(service_name);
    };


    _getHeader(service_name, opt) {
        this.askId = ++this.askId % 2147483648;   // 2 ^ 31
        return Object.assign({
            service_sign: crc32.signed(service_name),
            askId: this.askId,
        }, opt);
    }


    destroy() {
        if (this.closed) {
            return 0;
        }
        this.closed = true;
        if (!this.client.destroyed) {
            this.client.end();
            this.client.destroy();
        }
        this.accepts.clear();
        this.acceptMap.clear();
        this.rpcs.clear();
        this.removeAllListeners();
    };


    _connectHandler() {
        this.emit('connect');
    };


    _closeHandler() {
        this.emit('close');
        this.destroy();
    };


    _errorHandler(error) {
        this.emit('error', error);
    };
}


module.exports = ClientSocket;