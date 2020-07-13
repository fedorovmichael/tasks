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
exports.verifyRole = exports.verifyEmail = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const user_db_1 = require("../db/user.db");
connection_db_1.default();
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`verifyEmail: ${JSON.stringify(req.body)}`);
        const user = yield user_db_1.getUserByEmail(req.body.email);
        console.log(`verifyEmail user from db: ${JSON.stringify(user)}`);
        if (user !== null) {
            console.log(`verifyEmail user from db 1: ${JSON.stringify(user)}`);
            res.status(400).send({ success: false, text: `User with email exists: ${req.body.email}`, data: null });
            return;
        }
        else {
            console.log(`verifyEmail user next step: ${JSON.stringify(user)}`);
        }
    }
    catch (error) {
        res.status(500).send({ success: false, text: `Find user by email error: ${error}`, data: null });
        return;
    }
    next();
});
exports.verifyEmail = verifyEmail;
const verifyRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`verifyRole: ${JSON.stringify(req.body)}`);
        const arrRolesObj = yield user_db_1.getRoles();
        const arrRoles = arrRolesObj.map((r) => r.name);
        const usRoles = [];
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!arrRoles.includes(req.body.roles[i])) {
                    res.status(400).send({ success: false, text: `Failed! Role ${req.body.roles[i]} does not exist!`, data: null });
                    return;
                }
                else {
                    usRoles.push(arrRolesObj.filter(r => r.name === req.body.roles[i])[0]);
                }
            }
            req.body.roles = usRoles;
        }
    }
    catch (error) {
        res.status(500).send({ success: false, text: `Get roles error: ${error}`, data: null });
        return;
    }
    next();
});
exports.verifyRole = verifyRole;
