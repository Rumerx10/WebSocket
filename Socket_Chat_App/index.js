import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("New User Connected.");

  socket.on("chat",(msg)=>{
    console.log(msg);
  })
});

expressServer.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
