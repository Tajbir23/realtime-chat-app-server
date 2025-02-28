"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectedUser_1 = require("./connectedUser");
const messageUser_1 = require("./messageUser");
const logOutUser_1 = require("./logOutUser");
const disconnectUser_1 = require("./disconnectUser");
const setUpSocketHandler = (io) => {
    io.on("connection", (socket) => {
        socket.on("connected", (user) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("setUpSocketHandler connected user", user);
            if (user === null || user === void 0 ? void 0 : user._id) {
                (0, connectedUser_1.connectedUser)(user, socket);
            }
        }));
        socket.on("sendUpcomingMessage", (message) => {
            (0, messageUser_1.messageUser)(message);
        });
        socket.on("logout", () => __awaiter(void 0, void 0, void 0, function* () {
            (0, logOutUser_1.logOutUser)(socket);
        }));
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            (0, disconnectUser_1.disconnectUser)(socket);
        }));
    });
};
exports.default = setUpSocketHandler;
