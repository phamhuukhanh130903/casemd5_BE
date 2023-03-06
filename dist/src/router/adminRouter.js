"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserController_2 = __importDefault(require("../controller/UserController"));
const admin_1 = require("../middleware/admin");
const auth_1 = require("../middleware/auth");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.use(auth_1.auth);
exports.adminRouter.get('', admin_1.adminAuth, UserController_2.default.getAllUser);
exports.adminRouter.delete('/:idUser', admin_1.adminAuth, UserController_1.default.removeUser);
//# sourceMappingURL=adminRouter.js.map