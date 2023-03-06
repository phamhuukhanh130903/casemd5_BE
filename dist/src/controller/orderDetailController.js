"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderDetailService_1 = __importDefault(require("../service/orderDetailService"));
const userService_1 = __importDefault(require("../service/userService"));
const orderService_1 = __importDefault(require("../service/orderService"));
const homeService_1 = __importDefault(require("../service/homeService"));
class OrderDetailController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.getAllOrderDetail();
                return res.status(200).json(orderDetails);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getOrderDetail = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.getOrderDetail(req.params.idUser);
                return res.status(200).json(orderDetails);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getOrderDetailById = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.getOrderDetailById(req.params.id);
                return res.status(200).json(orderDetails[0]);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getOrderDetailByHome = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.getOrderDetailByHome(req.params.id);
                return res.status(200).json(orderDetails);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createOrderDetail = async (req, res) => {
            try {
                let time = new Date().toLocaleDateString();
                let checkTime = time.split('/');
                let checkIn = req.body.checkIn.split('-');
                let checkOut = req.body.checkOut.split('-');
                if (+checkTime[2] > +checkIn[0]) {
                    return res.status(200).json('Wrong Check In');
                }
                else if (+checkTime[2] === +checkIn[0] && +checkTime[0] > +checkIn[1]) {
                    return res.status(200).json('Wrong Check In');
                }
                else if (+checkTime[2] === +checkIn[0] && +checkTime[0] === +checkIn[1] && +checkTime[1] > +checkIn[2]) {
                    return res.status(200).json('Wrong Check In');
                }
                else {
                    if (+checkIn[0] > +checkOut[0]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else if (+checkIn[0] === +checkOut[0] && +checkIn[1] > +checkOut[1]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else if (+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1] && +checkIn[2] >= +checkOut[2]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else {
                        let orderDetail = await orderDetailService_1.default.save(req.body);
                        let home = await homeService_1.default.changeStatusHome(req.body.idHome);
                        return res.status(200).json(orderDetail);
                    }
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editOrderDetail = async (req, res) => {
            try {
                let idOrderDetail = +req.params.id;
                let newOrderDetail = req.body;
                let idUser = req["decoded"].idUser;
                let check = await this.orderDetailService.checkUser(idUser, idOrderDetail);
                let checkIn = newOrderDetail.checkIn.split('-');
                let checkOut = newOrderDetail.checkOut.split('-');
                if (check) {
                    if (+checkIn[0] > +checkOut[0]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else if (+checkIn[0] === +checkOut[0] && +checkIn[1] > +checkOut[1]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else if (+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1] && +checkIn[2] >= +checkOut[2]) {
                        return res.status(200).json('Wrong Check Out');
                    }
                    else {
                        let order = await this.orderDetailService.updateOrderDetail(idOrderDetail, newOrderDetail);
                        return res.status(200).json(order);
                    }
                }
                else {
                    return res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.cancelOrderDetail = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.getOrderDetailById(req.params.id);
                let checkIn = orderDetails[0].checkIn.split('-');
                let checkOut = orderDetails[0].checkOut.split('-');
                if (+checkIn[0] === +checkOut[0] && +checkIn[1] === +checkOut[1] && ((+checkOut[2] - +checkIn[2]) === 1)) {
                    return res.status(200).json(`Wrong`);
                }
                else {
                    await orderDetailService_1.default.cancelOrderDetail(req.params.id);
                    let home = await homeService_1.default.changeStatusHome(req.body.idHome);
                    return res.status(200).json(`Success`);
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkOut = async (req, res) => {
            try {
                let orderDetails = await orderDetailService_1.default.changeStatusOrder(req.params.id);
                let home = await homeService_1.default.changeStatusHome(req.body.idHome);
                return res.status(200).json('Success');
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.orderDetailService = orderDetailService_1.default;
        this.userService = userService_1.default;
        this.orderService = orderService_1.default;
        this.homeService = homeService_1.default;
    }
}
exports.default = new OrderDetailController();
//# sourceMappingURL=orderDetailController.js.map