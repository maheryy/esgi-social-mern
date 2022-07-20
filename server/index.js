require('dotenv').config();
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

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Hello world!");
});

app.use(accessLog);
app.use("/client-errors", ClientErrorsRouter);
app.use("/access-logs", AccessLogsRouter);
app.use("/users", UserRouter);
app.use("/chat", ChatRouter);
app.use("/friends", FriendRouter);

app.use("/messages", MessageRouter);

app.listen(port, () => console.log(`Server started ${port}`));
