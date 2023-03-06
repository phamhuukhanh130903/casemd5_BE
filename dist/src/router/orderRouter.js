"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const OrderController_1 = __importDefault(require("../controller/OrderController"));
const auth_1 = require("../middleware/auth");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(auth_1.auth);
exports.orderRouter.get('', OrderController_1.default.getAll);
exports.orderRouter.post('/', OrderController_1.default.createOrder);
exports.orderRouter.put('/:idOrder', OrderController_1.default.editOrder);
exports.orderRouter.delete('/:idOrder', OrderController_1.default.deleteOrder);
exports.orderRouter.get('/find-order/:idOrder', OrderController_1.default.findByIdOrder);
exports.orderRouter.get('/my-order/:idUser', OrderController_1.default.showOrderByIdUser);
//# sourceMappingURL=orderRouter.js.map