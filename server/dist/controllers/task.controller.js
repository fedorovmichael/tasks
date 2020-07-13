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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDelete = exports.taskUpdate = exports.taskEdit = exports.taskNew = exports.tasksList = void 0;
const task_db_1 = require("../db/task.db");
const tasksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const liTasks = yield task_db_1.listTasks();
        //console.log(`get task list: ${liTasks}`)
        const response = { success: true, text: '', data: liTasks };
        res.send(response);
    }
    catch (error) {
        const response = { success: false, text: `get list tasks error: ${error}`, data: null };
        res.send(response);
    }
});
exports.tasksList = tasksList;
const taskNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("taskNew input params: ", req.body);
        const result = yield task_db_1.newTask(req.body);
        const response = { success: true, text: '', data: result };
        res.send(response);
    }
    catch (error) {
        const response = { success: false, text: `create task error: ${error}`, data: null };
        res.send(response);
    }
});
exports.taskNew = taskNew;
const taskEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield task_db_1.getTaskById(req.body.taskId);
        const response = { success: true, text: '', data: result };
        res.send(response);
    }
    catch (error) {
        const response = { success: false, text: `get task by id error: ${error}`, data: null };
        res.send(response);
    }
});
exports.taskEdit = taskEdit;
const taskUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("taskUpdate input params: ", req.body);
        const result = yield task_db_1.updateTask(req.body);
        const response = { success: true, text: '', data: result };
        res.send(response);
    }
    catch (error) {
        const response = { success: false, text: `update task error: ${error}`, data: null };
        res.send(response);
    }
});
exports.taskUpdate = taskUpdate;
const taskDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("taskDelete input params: ", req.body.ids);
        const result = yield task_db_1.deleteTask(req.body.ids);
        const response = { success: true, text: '', data: result };
        res.send(response);
    }
    catch (error) {
        const response = { success: false, text: `delete tasks error: ${error}`, data: null };
        res.send(response);
    }
});
exports.taskDelete = taskDelete;
