import { Request, Response } from "express";
declare class OrderDetailController {
    private orderDetailService;
    private homeService;
    private userService;
    private orderService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOrderDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOrderDetailById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getOrderDetailByHome: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createOrderDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editOrderDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    cancelOrderDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOut: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderDetailController;
export default _default;
