"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailRouter = void 0;
const express_1 = require("express");
const orderDetailController_1 = __importDefault(require("../controller/orderDetailController"));
const auth_1 = require("../middleware/auth");
exports.orderDetailRouter = (0, express_1.Router)();
exports.orderDetailRouter.use(auth_1.auth);
exports.orderDetailRouter.get('/', orderDetailController_1.default.getAll);
exports.orderDetailRouter.get('/my-order-detail/:idUser', orderDetailController_1.default.getOrderDetail);
exports.orderDetailRouter.get('/order-detail/:id', orderDetailController_1.default.getOrderDetailById);
exports.orderDetailRouter.get('/order-by-home/:id', orderDetailController_1.default.getOrderDetailByHome);
exports.orderDetailRouter.post('/', orderDetailController_1.default.createOrderDetail);
exports.orderDetailRouter.put('/edit/:id', orderDetailController_1.default.editOrderDetail);
exports.orderDetailRouter.put('/cancel/:id', orderDetailController_1.default.cancelOrderDetail);
exports.orderDetailRouter.put('/check-out/:id', orderDetailController_1.default.checkOut);
//# sourceMappingURL=orderDetailRouter.js.map