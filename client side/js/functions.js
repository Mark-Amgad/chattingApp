export const getMessage = ()=>{
    const msgField = document.querySelector("#msg");
    return msgField.value;
};


export const addMessageToDOM = (userName,msg)=>{
    let divChatField = document.querySelector("#chat_field");

    let divMessage = document.createElement("div");
    divMessage.classList.add("message");

    let pName = document.createElement("p");
    pName.classList.add("meta");
    let date = new Date();
    pName.innerHTML = userName + " <span>" + date.getHours() + " : " + date.getMinutes() + " </span>";
    
    let pMessageText = document.createElement("p");
    pMessageText.classList.add("text");
    pMessageText.innerHTML = msg;

    divMessage.appendChild(pName);
    divMessage.appendChild(pMessageText);

    divChatField.appendChild(divMessage);
};

export const addUserToDom = (userName)=>{
    let usersField = document.querySelector("#users");
    let userLi = document.createElement("li");
    userLi.innerHTML = userName;
    usersField.appendChild(userLi);
}

export const removeUserFromDom = (userName) =>{
    let usersField = document.querySelector("#users");
    for(let i = 0 ; i < usersField.children.length;i++)
    {
        if(usersField.children[i].innerHTML === userName)
        {
            usersField.removeChild(usersField.children[i]);
            break;
        }
    }
}

