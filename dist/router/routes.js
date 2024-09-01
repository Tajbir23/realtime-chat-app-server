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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_1 = __importDefault(require("../controllers/createUser"));
const verifyJwt_1 = __importDefault(require("../controllers/verifyJwt"));
const validationUser_1 = __importDefault(require("../controllers/validationUser"));
const loginUser_1 = __importDefault(require("../controllers/loginUser"));
const getAllUsers_1 = __importDefault(require("../controllers/getAllUsers"));
const findUser_1 = __importDefault(require("../controllers/findUser"));
const postMessage_1 = __importDefault(require("../controllers/message/postMessage"));
const getMessage_1 = __importDefault(require("../controllers/message/getMessage"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getFriends_1 = __importDefault(require("../controllers/friends/getFriends"));
const router = (0, express_1.Router)();
router.post('/signup', createUser_1.default);
router.get('/user_validation', verifyJwt_1.default, validationUser_1.default);
router.post('/login', loginUser_1.default);
router.get('/users', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username } = req.user;
    console.log("route called", username);
    try {
        const users = yield (0, getAllUsers_1.default)();
        res.send(users);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
router.get('/user/:id', verifyJwt_1.default, findUser_1.default);
router.post('/message', verifyJwt_1.default, postMessage_1.default);
router.get('/message/:id', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username } = req.user;
    const { currentPage = 1 } = req.query;
    try {
        const skip = (Number(currentPage - 1) * 10);
        const isValidId = yield mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValidId) {
            return res.status(404).json({ message: 'User not found' });
        }
        userSchema_1.default.findOne({ _id: id }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const receiverUsername = (_a = user === null || user === void 0 ? void 0 : user.username) !== null && _a !== void 0 ? _a : '';
            console.log(receiverUsername, username);
            const message = yield (0, getMessage_1.default)(username, receiverUsername, skip);
            res.send(message);
        }));
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
router.get('/friends', verifyJwt_1.default, getFriends_1.default);
exports.default = router;
