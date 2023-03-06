"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = require("express");
const homeController_1 = __importDefault(require("../controller/homeController"));
const user_1 = require("../middleware/user");
exports.homeRouter = (0, express_1.Router)();
exports.homeRouter.get("", homeController_1.default.index);
exports.homeRouter.get("/users", homeController_1.default.getAllHome);
exports.homeRouter.get('/find-by-address', homeController_1.default.findHomeByAddress);
exports.homeRouter.get('/for-rent', homeController_1.default.findHomeForRent);
exports.homeRouter.get('/rented', homeController_1.default.findHomeRented);
exports.homeRouter.get("/my-homes", homeController_1.default.getMyHome);
exports.homeRouter.post("", user_1.userAuth, homeController_1.default.createHome);
exports.homeRouter.put("/:idHome", user_1.userAuth, homeController_1.default.editHome);
exports.homeRouter.delete("/:idHome", homeController_1.default.deleteHome);
exports.homeRouter.get("/find-by-id/:idHome", user_1.userAuth, homeController_1.default.findByIdHome);
exports.homeRouter.get("/rent-home/:idHome", homeController_1.default.countHome);
exports.homeRouter.get("/my-home/:idUser", homeController_1.default.findHomeByIdUser);
//# sourceMappingURL=homeRouter.js.map