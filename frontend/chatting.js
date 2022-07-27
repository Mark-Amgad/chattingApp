import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const clientSocket = io();// connection

const sendMessage = (msg)=>{
    clientSocket.emit("message",msg);
};

sendMessage("hi I am mark");

// on submit -> get the message from dom -> send it to the server


// when recieve a message -> change the dom (add message)