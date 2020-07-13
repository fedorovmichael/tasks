"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const verifySignUp_1 = require("../middleware/verifySignUp");
const user_controller_1 = require("../controllers/user.controller");
router.get('/', (req, res) => {
    res.send('hello from user');
});
router.post('/user', verifySignUp_1.verifyEmail, user_controller_1.getUser);
router.post('/usersignup', [verifySignUp_1.verifyEmail, verifySignUp_1.verifyRole], user_controller_1.signUpUser);
router.post('/usersignin', user_controller_1.singInUser);
exports.default = router;
