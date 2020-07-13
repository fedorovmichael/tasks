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
exports.singInUser = exports.signUpUser = exports.getUser = void 0;
const user_db_1 = require("../db/user.db");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const us = yield user_db_1.getUserByEmail(req.body.email);
        res.send(us);
    }
    catch (error) {
        res.send(`get user error: ${error}`);
    }
});
exports.getUser = getUser;
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`signUpUser input params: ${req.body}`);
        const userRoles = req.body.roles;
        const userObj = {
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs_1.default.hashSync(req.body.password),
            roles: req.body.roles
        };
        console.log(`signUpUser user before save: ${JSON.stringify(userObj)}`);
        const us = yield user_db_1.newUser(userObj);
        console.log(`signUpUser save user result: ${us}`);
        res.send({ success: true, text: `Signup user success.`, data: us });
    }
    catch (error) {
        res.status(500).send({ success: false, text: `Signup user error: ${error}`, data: null });
    }
});
exports.signUpUser = signUpUser;
const singInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`singInUser input params: ${req.body}`);
        const user = yield user_db_1.getUserByEmail(req.body.email);
        console.log(`singInUser user from db: ${user}`);
        if (!user) {
            res.status(400).send({ success: false, text: `Cant find user by email: ${req.body.email}`, data: null });
            return;
        }
        if (!bcryptjs_1.default.compareSync(req.body.password, user.password)) {
            res.status(400).send({ success: false, text: `Invalid password.`, data: null });
            return;
        }
        console.log(`jwt:  ${process.env.SECRET_JWT}`);
        const secret = process.env.SECRET_JWT ? process.env.SECRET_JWT : "";
        const token = jsonwebtoken_1.sign({ id: user.id }, secret, { expiresIn: 86400 });
        const resUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles,
            accessToken: token
        };
        res.send({ success: true, text: '', data: resUser });
    }
    catch (error) {
        res.status(500).send({ success: false, text: `Signin user error: ${error}`, data: null });
    }
});
exports.singInUser = singInUser;
