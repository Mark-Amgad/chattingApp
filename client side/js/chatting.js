import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { addMessageToDOM,getMessage,addUserToDom, removeUserFromDom } from "./functions.js";

let userName = new URLSearchParams(window.location.search).get("username");
const clientSocket = io();// connection





clientSocket.on("myJoin",(users)=>{
    for(let i = 0;i < users.length;i++)
    {
        addUserToDom(users[i][1]);
    }
});


clientSocket.on("join",(userName)=>{
    addUserToDom(userName);
});



clientSocket.on("message",(userName,msg)=>{
    addMessageToDOM(userName,msg);
});




clientSocket.emit("join",userName);
const sendBtn = document.querySelector("#send_btn");
sendBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const msg = getMessage();
    clientSocket.emit("message",userName,msg);
});

clientSocket.on("removeUser",(userName)=>{
    removeUserFromDom(userName);
});