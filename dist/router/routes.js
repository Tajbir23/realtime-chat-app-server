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
const postMessage_1 = __importDefault(require("../controllers/message/postMessage"));
const getMessage_1 = __importDefault(require("../controllers/message/getMessage"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getFriends_1 = __importDefault(require("../controllers/friends/getFriends"));
const search_1 = __importDefault(require("../controllers/search"));
const findUser_1 = __importDefault(require("../controllers/findUser"));
const blockFriend_1 = __importDefault(require("../controllers/friends/blockFriend"));
const postMyDay_1 = __importDefault(require("../controllers/Day/postMyDay"));
const postLike_1 = __importDefault(require("../controllers/Day/postLike"));
const getTotalLikeAndComments_1 = __importDefault(require("../controllers/Day/getTotalLikeAndComments"));
const postComment_1 = __importDefault(require("../controllers/Day/postComment"));
const getComments_1 = __importDefault(require("../controllers/Day/getComments"));
const shareMyDay_1 = __importDefault(require("../controllers/Day/shareMyDay"));
const shareCountMyDay_1 = __importDefault(require("../controllers/Day/shareCountMyDay"));
const getNotification_1 = __importDefault(require("../controllers/Day/notification/getNotification"));
const getUnreadNotificationCount_1 = __importDefault(require("../controllers/Day/notification/getUnreadNotificationCount"));
const postEmoji_1 = __importDefault(require("../controllers/message/postEmoji"));
const deleteMessage_1 = __importDefault(require("../controllers/message/deleteMessage"));
const editMessage_1 = __importDefault(require("../controllers/message/editMessage"));
const updateTheme_1 = __importDefault(require("../controllers/message/theme/updateTheme"));
const deleteChat_1 = __importDefault(require("../controllers/friends/deleteChat"));
const connectionEncryption_1 = __importDefault(require("../controllers/friends/encryption/connectionEncryption"));
const updateSeenMessage_1 = __importDefault(require("../controllers/message/updateSeenMessage"));
const router = (0, express_1.Router)();
router.post('/signup', createUser_1.default);
router.get('/user_validation', verifyJwt_1.default, validationUser_1.default);
router.post('/login', loginUser_1.default);
router.get('/users', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, username } = req.user;
    const { page } = req.query;
    try {
        const users = yield (0, getAllUsers_1.default)((_a = page) !== null && _a !== void 0 ? _a : 1);
        res.send(users);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
router.get('/user/:id', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield (0, findUser_1.default)(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.send(user);
    }
    catch (error) {
        res.status(404).json({ message: "user not found" });
    }
}));
router.post('/message', verifyJwt_1.default, postMessage_1.default);
router.get('/message/:id', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, _id } = req.user;
    const { currentPage = 1 } = req.query;
    console.log(id, currentPage);
    try {
        const skip = (Number(currentPage - 1) * 10);
        const isValidId = yield mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValidId) {
            return res.status(404).json({ message: 'User not found' });
        }
        userSchema_1.default.findOne({ _id: id }).then((user) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const receiverUsername = (_a = user === null || user === void 0 ? void 0 : user.username) !== null && _a !== void 0 ? _a : '';
            const message = yield (0, getMessage_1.default)(username, receiverUsername, _id, skip);
            res.send(message);
        }));
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
router.get('/friends', verifyJwt_1.default, getFriends_1.default);
router.get('/search/:search', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.params;
    const { email } = req.query;
    const result = yield (0, search_1.default)(search, email);
    res.send(result);
}));
router.post('/friend/block/:chatId', verifyJwt_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { chatId } = req.params;
    const { blockUserId, isBlock } = req.body;
    yield (0, blockFriend_1.default)(_id, chatId, blockUserId, isBlock);
}));
router.post('/create_my_day', verifyJwt_1.default, postMyDay_1.default);
router.post('/like', verifyJwt_1.default, postLike_1.default);
router.post('/total_like_and_comments', verifyJwt_1.default, getTotalLikeAndComments_1.default);
router.post('/comment', verifyJwt_1.default, postComment_1.default);
router.get('/comments/:myDayId', getComments_1.default);
router.get('/share/:id', shareMyDay_1.default);
router.post('/share', shareCountMyDay_1.default);
router.get('/notifications', verifyJwt_1.default, getNotification_1.default);
router.get('/notifications/unread', verifyJwt_1.default, getUnreadNotificationCount_1.default);
router.post('/emoji', verifyJwt_1.default, postEmoji_1.default);
router.post('/message/delete/:id', verifyJwt_1.default, deleteMessage_1.default);
router.put('/message/edit/:messageId', verifyJwt_1.default, editMessage_1.default);
router.put('/chat/theme/:chatId', verifyJwt_1.default, updateTheme_1.default);
router.post('/chat/deleteChat', verifyJwt_1.default, deleteChat_1.default);
router.put('/encryption', verifyJwt_1.default, connectionEncryption_1.default);
router.put('/seen_message', verifyJwt_1.default, updateSeenMessage_1.default);
exports.default = router;
