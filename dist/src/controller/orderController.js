"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("../service/orderService"));
const userService_1 = __importDefault(require("../service/userService"));
class OrderController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let orders = await orderService_1.default.getMyOrder(req["decoded"].idUser);
                return res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createOrder = async (req, res) => {
            try {
                let order = await orderService_1.default.save(req.body);
                return res.status(200).json(order);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdOrder = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let order = await orderService_1.default.findById(idOrder);
                return res.status(200).jsonp(order);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editOrder = async (req, res) => {
            try {
                let idOrder = req.params.idOrder;
                let newOrder = req.body;
                let idUser = req["decoded"].idUser;
                let check = await this.orderService.checkUser(idUser, idOrder);
                if (check) {
                    let order = await this.orderService.updateOrder(idOrder, newOrder);
                    return res.status(200).json(order);
                }
                else {
                    return res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.deleteOrder = async (req, res) => {
            try {
                let idOrder = req.params.id;
                let orderDetails = await orderService_1.default.deleteOrder(idOrder);
                return res.status(200).json(orderDetails);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.showOrderByIdUser = async (req, res) => {
            try {
                let orders = await this.orderService.findorderByIdUser(req.params.idUser);
                return res.status(200).json(orders);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.orderService = orderService_1.default;
        this.userService = userService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=orderController.js.map