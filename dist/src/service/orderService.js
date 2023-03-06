"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
class OrderService {
    constructor() {
        this.getAllOrder = async () => {
            let sql = `select * from order o join user u on o.idUser = u.idUser`;
            let orders = await this.orderRepository.query(sql);
            return orders;
        };
        this.getMyOrder = async (idUser) => {
            let sql = `select * from order o join user u on o.idUser = u.idUser where u.idUser = ${idUser}`;
            let orders = await this.orderRepository.query(sql);
            return orders;
        };
        this.save = async (order) => {
            return this.orderRepository.save(order);
        };
        this.findById = async (idOrder) => {
            let orders = await this.orderRepository.findOneBy({ idOrder: idOrder });
            return orders;
        };
        this.updateOrder = async (idOrder, newOrder) => {
            let orders = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!orders) {
                return null;
            }
            return await this.orderRepository.update({ idOrder: idOrder }, newOrder);
        };
        this.deleteOrder = async (idOrder) => {
            let order = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (!order) {
                return null;
            }
            return this.orderRepository.delete({ idOrder: idOrder });
        };
        this.findOrderByIdUser = async (idUser) => {
            let orders = this.orderRepository.findOneBy({ idUser: idUser });
            return orders;
        };
        this.checkUser = async (idUser, idOrder) => {
            let checkIdUser = await this.orderRepository.findOneBy({ idOrder: idOrder });
            if (checkIdUser.idUser === idUser) {
                return true;
            }
            return false;
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=orderService.js.map