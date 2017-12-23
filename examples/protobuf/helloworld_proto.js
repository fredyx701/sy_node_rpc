/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.helloworld = (function () {

    /**
     * Namespace helloworld.
     * @exports helloworld
     * @namespace
     */
    var helloworld = {};

    helloworld.Greeter = (function () {

        /**
         * Constructs a new Greeter service.
         * @memberof helloworld
         * @classdesc Represents a Greeter
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Greeter(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (Greeter.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Greeter;

        /**
         * Creates new Greeter service using the specified rpc implementation.
         * @function create
         * @memberof helloworld.Greeter
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Greeter} RPC service. Useful where requests and/or responses are streamed.
         */
        Greeter.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link helloworld.Greeter#sayHello}.
         * @memberof helloworld.Greeter
         * @typedef SayHelloCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {helloworld.HelloReply} [response] HelloReply
         */

        /**
         * Calls SayHello.
         * @function sayHello
         * @memberof helloworld.Greeter
         * @instance
         * @param {helloworld.IHelloRequest} request HelloRequest message or plain object
         * @param {helloworld.Greeter.SayHelloCallback} callback Node-style callback called with the error, if any, and HelloReply
         * @returns {undefined}
         * @variation 1
         */
        Greeter.prototype.sayHello = function sayHello(request, callback) {
            return this.rpcCall(sayHello, $root.helloworld.HelloRequest, $root.helloworld.HelloReply, request, callback);
        };

        /**
         * Calls SayHello.
         * @function sayHello
         * @memberof helloworld.Greeter
         * @instance
         * @param {helloworld.IHelloRequest} request HelloRequest message or plain object
         * @returns {Promise<helloworld.HelloReply>} Promise
         * @variation 2
         */

        return Greeter;
    })();

    helloworld.HelloRequest = (function () {

        /**
         * Properties of a HelloRequest.
         * @memberof helloworld
         * @interface IHelloRequest
         * @property {string|null} [name] HelloRequest name
         * @property {Array.<number>|null} [id] HelloRequest id
         */

        /**
         * Constructs a new HelloRequest.
         * @memberof helloworld
         * @classdesc Represents a HelloRequest.
         * @implements IHelloRequest
         * @constructor
         * @param {helloworld.IHelloRequest=} [properties] Properties to set
         */
        function HelloRequest(properties) {
            this.id = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloRequest name.
         * @member {string} name
         * @memberof helloworld.HelloRequest
         * @instance
         */
        HelloRequest.prototype.name = "";

        /**
         * HelloRequest id.
         * @member {Array.<number>} id
         * @memberof helloworld.HelloRequest
         * @instance
         */
        HelloRequest.prototype.id = $util.emptyArray;

        /**
         * Creates a new HelloRequest instance using the specified properties.
         * @function create
         * @memberof helloworld.HelloRequest
         * @static
         * @param {helloworld.IHelloRequest=} [properties] Properties to set
         * @returns {helloworld.HelloRequest} HelloRequest instance
         */
        HelloRequest.create = function create(properties) {
            return new HelloRequest(properties);
        };

        /**
         * Encodes the specified HelloRequest message. Does not implicitly {@link helloworld.HelloRequest.verify|verify} messages.
         * @function encode
         * @memberof helloworld.HelloRequest
         * @static
         * @param {helloworld.IHelloRequest} message HelloRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.id != null && message.id.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.id.length; ++i)
                    writer.int32(message.id[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link helloworld.HelloRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof helloworld.HelloRequest
         * @static
         * @param {helloworld.IHelloRequest} message HelloRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloRequest message from the specified reader or buffer.
         * @function decode
         * @memberof helloworld.HelloRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {helloworld.HelloRequest} HelloRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.helloworld.HelloRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        if (!(message.id && message.id.length))
                            message.id = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.id.push(reader.int32());
                        } else
                            message.id.push(reader.int32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof helloworld.HelloRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {helloworld.HelloRequest} HelloRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HelloRequest message.
         * @function verify
         * @memberof helloworld.HelloRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HelloRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.id != null && message.hasOwnProperty("id")) {
                if (!Array.isArray(message.id))
                    return "id: array expected";
                for (var i = 0; i < message.id.length; ++i)
                    if (!$util.isInteger(message.id[i]))
                        return "id: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof helloworld.HelloRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {helloworld.HelloRequest} HelloRequest
         */
        HelloRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.helloworld.HelloRequest)
                return object;
            var message = new $root.helloworld.HelloRequest();
            if (object.name != null)
                message.name = String(object.name);
            if (object.id) {
                if (!Array.isArray(object.id))
                    throw TypeError(".helloworld.HelloRequest.id: array expected");
                message.id = [];
                for (var i = 0; i < object.id.length; ++i)
                    message.id[i] = object.id[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof helloworld.HelloRequest
         * @static
         * @param {helloworld.HelloRequest} message HelloRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HelloRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.id = [];
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.id && message.id.length) {
                object.id = [];
                for (var j = 0; j < message.id.length; ++j)
                    object.id[j] = message.id[j];
            }
            return object;
        };

        /**
         * Converts this HelloRequest to JSON.
         * @function toJSON
         * @memberof helloworld.HelloRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HelloRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HelloRequest;
    })();

    helloworld.HelloReply = (function () {

        /**
         * Properties of a HelloReply.
         * @memberof helloworld
         * @interface IHelloReply
         * @property {string|null} [message] HelloReply message
         * @property {Array.<number>|null} [id] HelloReply id
         * @property {number|null} [field] HelloReply field
         */

        /**
         * Constructs a new HelloReply.
         * @memberof helloworld
         * @classdesc Represents a HelloReply.
         * @implements IHelloReply
         * @constructor
         * @param {helloworld.IHelloReply=} [properties] Properties to set
         */
        function HelloReply(properties) {
            this.id = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloReply message.
         * @member {string} message
         * @memberof helloworld.HelloReply
         * @instance
         */
        HelloReply.prototype.message = "";

        /**
         * HelloReply id.
         * @member {Array.<number>} id
         * @memberof helloworld.HelloReply
         * @instance
         */
        HelloReply.prototype.id = $util.emptyArray;

        /**
         * HelloReply field.
         * @member {number} field
         * @memberof helloworld.HelloReply
         * @instance
         */
        HelloReply.prototype.field = 0;

        /**
         * Creates a new HelloReply instance using the specified properties.
         * @function create
         * @memberof helloworld.HelloReply
         * @static
         * @param {helloworld.IHelloReply=} [properties] Properties to set
         * @returns {helloworld.HelloReply} HelloReply instance
         */
        HelloReply.create = function create(properties) {
            return new HelloReply(properties);
        };

        /**
         * Encodes the specified HelloReply message. Does not implicitly {@link helloworld.HelloReply.verify|verify} messages.
         * @function encode
         * @memberof helloworld.HelloReply
         * @static
         * @param {helloworld.IHelloReply} message HelloReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            if (message.id != null && message.id.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (var i = 0; i < message.id.length; ++i)
                    writer.int32(message.id[i]);
                writer.ldelim();
            }
            if (message.field != null && message.hasOwnProperty("field"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.field);
            return writer;
        };

        /**
         * Encodes the specified HelloReply message, length delimited. Does not implicitly {@link helloworld.HelloReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof helloworld.HelloReply
         * @static
         * @param {helloworld.IHelloReply} message HelloReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloReply message from the specified reader or buffer.
         * @function decode
         * @memberof helloworld.HelloReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {helloworld.HelloReply} HelloReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.helloworld.HelloReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.message = reader.string();
                        break;
                    case 2:
                        if (!(message.id && message.id.length))
                            message.id = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.id.push(reader.int32());
                        } else
                            message.id.push(reader.int32());
                        break;
                    case 3:
                        message.field = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a HelloReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof helloworld.HelloReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {helloworld.HelloReply} HelloReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HelloReply message.
         * @function verify
         * @memberof helloworld.HelloReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HelloReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.id != null && message.hasOwnProperty("id")) {
                if (!Array.isArray(message.id))
                    return "id: array expected";
                for (var i = 0; i < message.id.length; ++i)
                    if (!$util.isInteger(message.id[i]))
                        return "id: integer[] expected";
            }
            if (message.field != null && message.hasOwnProperty("field"))
                if (!$util.isInteger(message.field))
                    return "field: integer expected";
            return null;
        };

        /**
         * Creates a HelloReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof helloworld.HelloReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {helloworld.HelloReply} HelloReply
         */
        HelloReply.fromObject = function fromObject(object) {
            if (object instanceof $root.helloworld.HelloReply)
                return object;
            var message = new $root.helloworld.HelloReply();
            if (object.message != null)
                message.message = String(object.message);
            if (object.id) {
                if (!Array.isArray(object.id))
                    throw TypeError(".helloworld.HelloReply.id: array expected");
                message.id = [];
                for (var i = 0; i < object.id.length; ++i)
                    message.id[i] = object.id[i] | 0;
            }
            if (object.field != null)
                message.field = object.field | 0;
            return message;
        };

        /**
         * Creates a plain object from a HelloReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof helloworld.HelloReply
         * @static
         * @param {helloworld.HelloReply} message HelloReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HelloReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.id = [];
            if (options.defaults) {
                object.message = "";
                object.field = 0;
            }
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.id && message.id.length) {
                object.id = [];
                for (var j = 0; j < message.id.length; ++j)
                    object.id[j] = message.id[j];
            }
            if (message.field != null && message.hasOwnProperty("field"))
                object.field = message.field;
            return object;
        };

        /**
         * Converts this HelloReply to JSON.
         * @function toJSON
         * @memberof helloworld.HelloReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HelloReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HelloReply;
    })();

    return helloworld;
})();

module.exports = $root;
