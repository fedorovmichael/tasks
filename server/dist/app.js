"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const app = express_1.default();
app.use(cors_1.default({ origin: '*' }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
dotenv_1.config();
//user
app.use('/', user_routes_1.default);
app.use('/user', user_routes_1.default);
app.use('/usersignup', user_routes_1.default);
app.use('/usersignin', user_routes_1.default);
//task
app.use('/', task_routes_1.default);
app.use('/tasks_list', task_routes_1.default);
app.use('/task_new', task_routes_1.default);
app.use('/task_edit', task_routes_1.default);
app.use('/task_update', task_routes_1.default);
app.use('/task_delete', task_routes_1.default);
app.listen(4000, () => console.log('Server is runnig on port: 4000'));
