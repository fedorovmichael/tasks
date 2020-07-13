"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = exports.newUser = exports.getUserByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const role_model_1 = __importDefault(require("../models/role.model"));
const getUserByEmail = (_emain) => {
    return user_model_1.default.findOne({ email: _emain }).populate('roles');
};
exports.getUserByEmail = getUserByEmail;
const newUser = (_user) => {
    return new user_model_1.default(_user).save();
};
exports.newUser = newUser;
const getRoles = () => {
    return role_model_1.default.find();
};
exports.getRoles = getRoles;
