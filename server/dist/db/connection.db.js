"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const connection = () => {
    console.log(`connection string: -  ${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`);
    const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
    mongoose_1.default.connect(`mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`, options)
        .then(() => {
        console.log('Successfully connect to MongoDB');
    })
        .catch(err => {
        console.error(`Connection to MongoDB error: ${err}`);
        process.exit();
    });
};
exports.default = connection;
