"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const orderDetail_1 = require("../model/orderDetail");
class OrderDetailService {
    constructor() {
        this.getAllOrderDetail = async () => {
            let sql = `select *
                   from home
                            join category c on 	home.idCategory = c.idCategory 
                            join order_detail od on home.idHome = od.idHome
                            join order o on od.idOrder = o.idOrder;`;
            let orderDetails = await this.orderDetailRepository.query(sql);
            return orderDetails;
        };
        this.getOrderDetail = async (idUser) => {
            let sql = `select * from home
                            join category c on 	home.idCategory = c.idCategory 
                            join order_detail od on home.idHome = od.idHome
                            join order1 o on od.idOrder = o.idOrder where o.idUser = ${idUser};`;
            let orderDetails = await this.orderDetailRepository.query(sql);
            return orderDetails;
        };
        this.getOrderDetailById = async (id) => {
            let sql = `select * from home
                            join category c on 	home.idCategory = c.idCategory 
                            join order_detail od on home.idHome = od.idHome
                            join order1 o on od.idOrder = o.idOrder where od.idOrderDetail = ${id};`;
            let orderDetails = await this.orderDetailRepository.query(sql);
            return orderDetails;
        };
        this.getOrderDetailByHome = async (id) => {
            let sql = `select * from order_detail od 
                            join order1 o on od.idOrder = o.idOrder
                            join user u on o.idUser = u.idUser where od.idHome = ${id};`;
            let orderDetails = await this.orderDetailRepository.query(sql);
            return orderDetails;
        };
        this.save = async (orderDetail) => {
            return await this.orderDetailRepository.save(orderDetail);
        };
        this.updateOrderDetail = async (id, newOrderDetail) => {
            let order = await this.orderDetailRepository.findOneBy({ idOrderDetail: id });
            if (!order) {
                return null;
            }
            return await this.orderDetailRepository.update({ idOrderDetail: id }, newOrderDetail);
        };
        this.cancelOrderDetail = async (idOrderDetail) => {
            let orderDetail = await this.orderDetailRepository.findOneBy({ idOrderDetail: idOrderDetail });
            if (!orderDetail) {
                return null;
            }
            orderDetail.statusOrder = 'Cancel';
            return this.orderDetailRepository.update({ idOrderDetail: idOrderDetail }, orderDetail);
        };
        this.checkUser = async (idUser, idOrderDetail) => {
            let sql = `select * from order_detail od
                        join order1 o on od.idOrder = o.idOrder
                        join user u on o.idUser = u.idUser where od.idOrderDetail = ${idOrderDetail};`;
            let checkIdUser = await this.orderDetailRepository.query(sql);
            if (checkIdUser[0].idUser === idUser) {
                return true;
            }
            return false;
        };
        this.changeStatusOrder = async (idOrderDetail) => {
            let orderDetail = await this.orderDetailRepository.findOneBy({ idOrderDetail: idOrderDetail });
            if (!orderDetail) {
                return null;
            }
            orderDetail.statusOrder = 'Check Out';
            return await this.orderDetailRepository.update({ idOrderDetail: idOrderDetail }, orderDetail);
        };
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderDetailService();
//# sourceMappingURL=orderDetailService.js.map