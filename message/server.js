const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const http = require("http").Server(app);

const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 8080;

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    socketIO.emit("response", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

http.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
