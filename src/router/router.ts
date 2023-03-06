import {Router} from "express";
import {homeRouter} from "./homeRouter";
import {categoryRouter} from "./categoryRouter";
import songController from "../controller/HomeController";
// import {albumRouter} from "./album-router";
import {userRouter} from "./userRouter";
import {adminRouter} from "./adminRouter";
import {orderRouter} from "./orderRouter";
import {orderDetailRouter} from "./orderDetailRouter";

export  const router = Router()
router.use('/api/homes',homeRouter);
router.use('/api/orders',orderRouter);
router.use('/api/orderDetails',orderDetailRouter);
router.use('/api/users',userRouter);
router.use('/api/admins',adminRouter);
// router.use('/albums',albumRouter);
router.use('/api/categories',categoryRouter);
// router.get('/find-by-name', songController.searchNameSong);