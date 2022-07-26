let clients = new Set();

module.exports = () => {
  return (req, res, next) => {
    res.initSSE = () => {
      console.log("SSE : new client");
      res.writeHead(200, {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
      });
      // res.flushHeaders();
      clients.add(res);

      // Connection health check
      const keepAlive = setInterval(() => {
        console.log('trying to keep alive');
        res.write(":\n\n");
        // res.flush();
      }, 55000);

      res.on("close", () => {
        console.log("SSE : client closed connection");
        clearInterval(keepAlive);
        clients.delete(res);
        res.end();
      });
    };

    res.sendEvent = (eventType, data) => {
      console.log("SSE : sent event " + eventType);

      const dataString =
        `data: ${JSON.stringify(data)}\n` +
        `event: ${eventType}\n\n`;

      for (let client of clients) {
        client.write(dataString);
        // client.flush();
      }
    };

    return next();
  };
};