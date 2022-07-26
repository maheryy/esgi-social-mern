require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const app = express();
const ClientErrorsRouter = require("./routes/ClientError");
const AccessLogsRouter = require("./routes/AccessLog");
const ChatRouter = require("./routes/Chat");
const MessageRouter = require("./routes/Message");
const FriendRouter = require("./routes/Friend");
const UserRouter = require("./routes/User");
const accessLog = require("./middleware/accessLog");
const SecurityRouter = require("./routes/Security");
const checkAuth = require("./middleware/checkAuth");
const sse = require("sse-esgi-iw2");
// const sse = require("./middleware/sse");

app.use(express.json());
app.use(cors());
app.use(sse());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.get("/sse", (req, res, next) => {
  res.initSSE();
});

app.use("/client-errors", ClientErrorsRouter);
app.use("/access-logs", AccessLogsRouter);
app.use("/users", UserRouter);
app.use("/chat", checkAuth, ChatRouter);
app.use("/friends", checkAuth, FriendRouter);
app.use("/messages", MessageRouter);
app.use("/security", SecurityRouter);
app.use(accessLog);

app.listen(port, () => console.log(`Server started ${port}`));
