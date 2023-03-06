import {Router} from "express";
import orderDetailController from "../controller/orderDetailController";
import {auth} from "../middleware/auth";

export const orderDetailRouter = Router()
orderDetailRouter.use(auth);
orderDetailRouter.get('/',orderDetailController.getAll);
orderDetailRouter.get('/my-order-detail/:idUser',orderDetailController.getOrderDetail);
orderDetailRouter.get('/order-detail/:id',orderDetailController.getOrderDetailById);
orderDetailRouter.get('/order-by-home/:id',orderDetailController.getOrderDetailByHome);
orderDetailRouter.post('/',orderDetailController.createOrderDetail)
orderDetailRouter.put('/edit/:id',orderDetailController.editOrderDetail)
orderDetailRouter.put('/cancel/:id',orderDetailController.cancelOrderDetail)
orderDetailRouter.put('/check-out/:id',orderDetailController.checkOut)
