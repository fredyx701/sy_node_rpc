const EventEmitter = require('events');

const HEAD_LEN = 14;

class BaseSocket extends EventEmitter {

    constructor() {
        super();
        this.buffer = null;
        this.offset = 0;
    }


    /**
     * 封包
     * 1. len       body长度  4字节
     * 2. flag      标签      2字节   0 rpc  1 rpc_res  2  event
     * 3. askId     消息id    4字节
     * 4. service   协议名    4字节   crc32加密
     * 5. body      包体
     *
     * @param header 消息头
     * @param body 消息体  json string
     */
    encode(header, body) {
        const body_len = Buffer.byteLength(body, 'utf8');
        let buffer = Buffer.alloc(HEAD_LEN + body_len);
        let offset = 0;

        buffer.writeInt32BE(body_len, offset);
        offset += 4;
        buffer.writeInt16BE(header.flag, offset);
        offset += 2;
        buffer.writeInt32BE(header.askId, offset);
        offset += 4;
        buffer.writeInt32BE(header.service_sign, offset);
        offset += 4;
        buffer.write(body, offset);
        return buffer;
    };


    /**
     * 解包
     * @param buffer
     */
    decode(buffer) {
        const msgs = [];
        this.buffer = this.buffer ? Buffer.concat([this.buffer, buffer]) : Buffer.from(buffer);
        this.offset = this.offset || 0;
        while (this.offset < this.buffer.length) {
            if (this.buffer.length - this.offset < HEAD_LEN) {
                break;
            }
            const body_len = this.buffer.readInt32BE(this.offset);
            if (body_len + HEAD_LEN <= this.buffer.slice(this.offset, this.offset + HEAD_LEN + body_len).length) {
                const header = {};
                header.len = body_len;
                this.offset += 4;
                header.flag = this.buffer.readInt16BE(this.offset);
                this.offset += 2;
                header.askId = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                header.service_sign = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                const body_buffer = this.buffer.slice(this.offset, this.offset + body_len);
                this.offset += body_len;
                try {
                    let body = '';
                    if (body_buffer.length > 0) {
                        body = JSON.parse(body_buffer.toString());
                    }
                    msgs.push({
                        header: header,
                        body: body
                    });
                } catch (err) {
                    err.message_body = {
                        header: header,
                        body: body_buffer.toString()
                    };
                    this.emit('error', err);
                }
            } else {
                break;
            }
        }
        //clear buffer
        if (this.offset === this.buffer.length) {
            this._clean();
        }
        return msgs;
    };


    /**
     * clear buffer
     */
    _clean = function () {
        this.buffer = null;
        this.offset = 0;
    };
}


module.exports = BaseSocket;