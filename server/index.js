const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const ClientErrorsRouter = require("./routes/ClientError");
const AccessLogsRouter = require("./routes/AccessLog");
const accessLog = require("./middleware/accessLog");

app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Hello world!");
});

app.use("/client-errors", ClientErrorsRouter);
app.use("/access-logs", AccessLogsRouter);
app.use(accessLog);

app.listen(port, () => console.log(`Server started ${port}`));