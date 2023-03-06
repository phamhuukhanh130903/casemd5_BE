"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const user_1 = require("../middleware/user");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', userController_1.default.register);
exports.userRouter.post('/login', userController_1.default.login);
exports.userRouter.get('/my-profile/:idUser', user_1.userAuth, userController_1.default.showMyProfile);
exports.userRouter.post('/check-old-password/:idUser', user_1.userAuth, userController_1.default.checkOldPassword);
exports.userRouter.post('/check-new-password/:idUser', user_1.userAuth, userController_1.default.checkNewPassword);
exports.userRouter.put('/change-password/:idUser', user_1.userAuth, userController_1.default.changePassword);
exports.userRouter.put('/:idUser', user_1.userAuth, userController_1.default.editUser);
//# sourceMappingURL=userRouter.js.map