declare class OrderService {
    private orderRepository;
    constructor();
    getAllOrder: () => Promise<any>;
    getMyOrder: (idUser: any) => Promise<any>;
    save: (order: any) => Promise<any>;
    findById: (idOrder: any) => Promise<any>;
    updateOrder: (idOrder: any, newOrder: any) => Promise<any>;
    deleteOrder: (idOrder: any) => Promise<any>;
    findOrderByIdUser: (idUser: any) => Promise<any>;
    checkUser: (idUser: any, idOrder: any) => Promise<boolean>;
}
declare const _default: OrderService;
export default _default;
