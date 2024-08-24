"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUser_1 = __importDefault(require("../controllers/createUser"));
const verifyJwt_1 = __importDefault(require("../controllers/verifyJwt"));
const validationUser_1 = __importDefault(require("../controllers/validationUser"));
const router = (0, express_1.Router)();
router.post('/signup', createUser_1.default);
router.get('/user_validation', verifyJwt_1.default, validationUser_1.default);
exports.default = router;
