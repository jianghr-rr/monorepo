const net = require('net');

module.exports = class RPC {
  /**
   * 构造函数
   *
   * @param {Object} config - 配置对象
   * @param {Function} config.encodeResponse - 编码响应数据的函数
   * @param {Function} config.decodeRequest - 解码请求数据的函数
   * @param {Function} config.isCompleteRequest - 判断请求是否完整的函数
   */
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.encodeResponse = encodeResponse;
    this.decodeRequest = decodeRequest;
    this.isCompleteRequest = isCompleteRequest;
  }

  createServer(callback) {
    let buffer = null;

    const tcpServer = net.createServer((socket) => {
      socket.on('data', (data) => {
        buffer =
          buffer && buffer.length > 0
            ? Buffer.concat([buffer, data]) // 有遗留数据才做拼接操作
            : data;

        let checkLength = null;
        while (buffer && (checkLength = this.isCompleteRequest(buffer))) {
          let requestBuffer = null;
          if (checkLength == buffer.length) {
            requestBuffer = buffer;
            buffer = null;
          } else {
            requestBuffer = buffer.slice(0, checkLength);
            buffer = buffer.slice(checkLength);
          }

          const request = this.decodeRequest(requestBuffer);
          callback(
            {
              // request
              body: request.result,
              socket,
            },
            {
              // response
              end: (data) => {
                const buffer = this.encodeResponse(data, request.seq);
                socket.write(buffer);
              },
            }
          );
        }
      });
    });

    return {
      listen() {
        tcpServer.listen.apply(tcpServer, arguments);
      },
    };
  }
};
