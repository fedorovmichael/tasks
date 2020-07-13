"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.listTasks = exports.newTask = exports.getTaskById = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getTaskById = (_id) => {
    return task_model_1.default.findOne({ _id: _id });
};
exports.getTaskById = getTaskById;
const newTask = (_task) => {
    return new task_model_1.default(_task).save();
};
exports.newTask = newTask;
const listTasks = () => {
    return task_model_1.default.find();
};
exports.listTasks = listTasks;
const updateTask = (_task) => {
    return task_model_1.default.updateOne({ _id: mongoose_1.default.Types.ObjectId(_task._id) }, { $set: _task });
};
exports.updateTask = updateTask;
const deleteTask = (_ids) => {
    return task_model_1.default.deleteMany({ _id: { $in: _ids } });
};
exports.deleteTask = deleteTask;
