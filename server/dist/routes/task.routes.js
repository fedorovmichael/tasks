"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const task_controller_1 = require("../controllers/task.controller");
router.get('/', (req, res) => {
    res.send('hello from task');
});
router.post('/tasks_list', task_controller_1.tasksList);
router.post('/task_new', task_controller_1.taskNew);
router.post('/task_edit', task_controller_1.taskEdit);
router.post('/task_update', task_controller_1.taskUpdate);
router.post('/task_delete', task_controller_1.taskDelete);
exports.default = router;
