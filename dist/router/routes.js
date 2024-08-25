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
const router = (0, express_1.Router)();
router.post('/signup', createUser_1.default);
router.get('/user_validation', verifyJwt_1.default, validationUser_1.default);
router.post('/login', loginUser_1.default);
// const allUsers = getAllUsers();
// io.emit('allUsers', allUsers)
router.get('/users', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getAllUsers_1.default)();
        res.send(users);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
exports.default = router;
