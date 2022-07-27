import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io"; // socket


const app = express();
const port = 3000;
const server = app.listen(port , ()=>{console.log("The server is running on "+ port)});
app.use(bodyParser.json());
app.use(cors());

const io = new Server(server);

let counter = 1;
io.on("connection",(client)=>{
    console.log("client " + counter + " is connected");
    counter++;
    client.emit("reply","hello client");
});
app.get("/",(req,res)=>{
    res.json({"msg":"this root is available"});
});