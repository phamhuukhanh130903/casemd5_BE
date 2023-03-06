declare class OrderDetailService {
    private orderDetailRepository;
    constructor();
    getAllOrderDetail: () => Promise<any>;
    getOrderDetail: (idUser: any) => Promise<any>;
    getOrderDetailById: (id: any) => Promise<any>;
    getOrderDetailByHome: (id: any) => Promise<any>;
    save: (orderDetail: any) => Promise<any>;
    updateOrderDetail: (id: any, newOrderDetail: any) => Promise<any>;
    cancelOrderDetail: (idOrderDetail: any) => Promise<any>;
    checkUser: (idUser: any, idOrderDetail: any) => Promise<boolean>;
    changeStatusOrder: (idOrderDetail: any) => Promise<any>;
}
declare const _default: OrderDetailService;
export default _default;
