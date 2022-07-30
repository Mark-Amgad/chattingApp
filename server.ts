import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io"; // socket
import path from "path";
import dotenv from "dotenv"

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const server = app.listen(port , ()=>{console.log("The server is running on "+ port)});
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname,"./client side")));

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
        io.emit("message",msg);
        console.log(msg);
    });

    client.on("join",(msg)=>{
        client.broadcast.emit("join",msg);
        console.log("client joined room");
    });
});