import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import { addMessageToDOM,getMessage } from "./functions.js";

let userName = new URLSearchParams(window.location.search).get("username");
// handle userName issue
console.log(userName);
const clientSocket = io();// connection
const sendMessage = (event,msg)=>{
    clientSocket.emit(event,msg);
};

const recieveMessage = (eventName,action)=>{
    clientSocket.on(eventName,(msg)=>{
        action(msg);
    });
}



recieveMessage("message",(msg)=>{
    addMessageToDOM(userName,msg);
});

recieveMessage("join",(msg)=>{
    console.log(msg);
});


sendMessage("join","I joined");
const sendBtn = document.querySelector("#send_btn");
sendBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const msg = getMessage();
    sendMessage("message",msg);
});

// on submit -> get the message from dom -> send it to the server


// when recieve a message -> change the dom (add message)