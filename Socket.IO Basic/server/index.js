import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

// NameSpace

let buyNsp = io.of("/buy");
buyNsp.on("connection", () => {
  buyNsp.emit("msg", "Buy Name Space");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", () => {
  sellNsp.emit("msg", "Sell Name Space");
});

// io.on("connection", (socket) => {
//   console.log("New user is connected.");
//   // Broadcast
//   io.sockets.emit("myBroadCast", "Broad Casting Data from server");

//   setInterval(() => {
//     const d = new Date();
//     const t = d.getTime();
//     socket.emit("time", t);
//   }, 100);

//   socket.on("clientMessage", (data) => {
//     console.log("client--->server", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User is disconnected.");
//   });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

expressServer.listen(8000, () => {
  console.log(`server is running at http://localhost:8000`);
});
