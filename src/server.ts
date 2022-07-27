import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io"; // socket


const app = express();
const port = 3000;
const server = app.listen(port , ()=>{console.log("The server is running on "+ port)});
app.use(bodyParser.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json({"msg":"this root is available"});
});


// websocket server
const io = new Server(server);

io.on("connection",(client)=>{
    console.log("client joined");
    
    client.on("disconnect",()=>{
        console.log("client left");
    });

    client.on("message",(msg)=>{
        client.broadcast.emit("message",msg);
    });
});