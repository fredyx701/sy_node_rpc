const EventEmitter = require('events');
const crc32 = require('buffer-crc32');

const HEAD_LEN = 18;

class Service extends EventEmitter {

    constructor() {
        super();
        this.buffer = null;
        this.offset = 0;
    }


    /**
     * 封包
     * 1. flag      标签  2字节     0 rpc  1 rpc_res  2  event
     * 2. askId     消息id  4字节
     * 2. len       body长度 4字节
     * 3. service   协议名  crc32加密  4字节
     * 4. crc32     body加密  4字节
     * 5. body      包体
     *
     * @param header 消息头
     * @param body 消息体  buffer
     */
    encode(header, body) {
        const body_crc = crc32.signed(body);
        let buffer = Buffer.alloc(HEAD_LEN);
        let offset = 0;

        buffer.writeInt16BE(header.flag, offset);
        offset += 2;
        buffer.writeInt32BE(header.askId, offset);
        offset += 4;
        buffer.writeInt32BE(body.length, offset);
        offset += 4;
        buffer.writeInt32BE(header.service_sign, offset);
        offset += 4;
        buffer.writeInt32BE(body_crc, offset);
        offset += 4;
        return Buffer.concat([buffer, body], HEAD_LEN + body.length);
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
            const body_len = this.buffer.readInt32BE(this.offset + 6);
            if (body_len + HEAD_LEN <= this.buffer.slice(this.offset, this.offset + HEAD_LEN + body_len).length) {
                const header = {};
                header.flag = this.buffer.readInt16BE(this.offset);
                this.offset += 2;
                header.askId = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                header.len = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                header.service_sign = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                header.body_crc = this.buffer.readInt32BE(this.offset);
                this.offset += 4;
                const body = this.buffer.slice(this.offset, this.offset + body_len);
                this.offset += body_len;

                // verify body
                if (crc32.signed(body) !== header.body_crc) {
                    this.emit('warn', {
                        message: 'body verify failed',
                        header: header,
                        body: body
                    });
                }

                msgs.push({
                    header: header,
                    body: body
                });
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


module.exports = Service;