"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const homeRouter_1 = require("./homeRouter");
const categoryRouter_1 = require("./categoryRouter");
const userRouter_1 = require("./userRouter");
const adminRouter_1 = require("./adminRouter");
const orderRouter_1 = require("./orderRouter");
const orderDetailRouter_1 = require("./orderDetailRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/api/homes', homeRouter_1.homeRouter);
exports.router.use('/api/orders', orderRouter_1.orderRouter);
exports.router.use('/api/orderDetails', orderDetailRouter_1.orderDetailRouter);
exports.router.use('/api/users', userRouter_1.userRouter);
exports.router.use('/api/admins', adminRouter_1.adminRouter);
exports.router.use('/api/categories', categoryRouter_1.categoryRouter);
//# sourceMappingURL=router.js.map