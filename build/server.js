"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io"); // socket
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = (0, express_1.default)();
dotenv_1.default.config();
var port = process.env.PORT || 3000;
var server = app.listen(port, function () { console.log("The server is running on " + port); });
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "./client side")));
app.get("/", function (req, res) {
    res.json({ "msg": "this root is available" });
});
// users storage
var users = Array();
// websocket server
var io = new socket_io_1.Server(server);
io.on("connection", function (client) {
    console.log("client joined");
    client.on("disconnect", function () {
        var userNameToRemove = "";
        for (var i = 0; i < users.length; i++) {
            if (users[i][0] === client.id) {
                userNameToRemove = users[i][1];
                users.splice(i, 1);
                break;
            }
        }
        io.emit("removeUser", userNameToRemove);
        console.log("client left");
    });
    client.on("message", function (userName, msg) {
        io.emit("message", userName, msg);
        console.log(userName + " : " + msg);
    });
    client.on("join", function (userName) {
        client.emit("myJoin", users);
        users.push([client.id, userName]);
        io.emit("join", userName);
        console.log("client joined room");
    });
});
