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
    res.redirect("/HTML_CSS/index.html");
});

// users storage

let users = Array();

// websocket server
const io = new Server(server);

io.on("connection",(client)=>{
    console.log("client joined");
    
    client.on("disconnect",()=>{
        let userNameToRemove = "";
        for(let i = 0 ; i<users.length;i++)
        {
            if(users[i][0] === client.id)
            {
                userNameToRemove = users[i][1];
                users.splice(i,1);
                break;
            }
        }
        io.emit("removeUser",userNameToRemove);
        console.log("client left");
    });

    client.on("message",(userName,msg)=>{
        io.emit("message",userName,msg);
        console.log(userName + " : " +msg);
    });

    client.on("join",(userName)=>{
        client.emit("myJoin",users);
        users.push([client.id,userName]);
        io.emit("join",userName);
        console.log("client joined room");
    });
});