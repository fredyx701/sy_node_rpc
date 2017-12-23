class ProtoCode {

    constructor(protoRoot) {
        this.root = protoRoot;
    }

    encode(message_name, data) {
        const MsgType = this.root.lookupType(message_name);
        const errMsg = MsgType.verify(data);
        if (errMsg) {
            throw new Error(errMsg);
        }
        const msg = MsgType.create(data);
        return MsgType.encode(msg).finish();
    }

    decode(message_name, buffer) {
        const MsgType = this.root.lookupType(message_name);
        const msg = MsgType.decode(buffer);
        return MsgType.toObject(msg);
    }
}


module.exports = ProtoCode;