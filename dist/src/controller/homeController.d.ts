import { Request, Response } from "express";
declare class HomeController {
    private homeService;
    constructor();
    getAllHome: (req: Request, res: Response) => Promise<void>;
    getMyHome: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    index: (req: Request, res: Response) => Promise<void>;
    createHome: (req: Request, res: Response) => Promise<void>;
    editHome: (req: Request, res: Response) => Promise<void>;
    deleteHome: (req: Request, res: Response) => Promise<void>;
    findByIdHome: (req: Request, res: Response) => Promise<void>;
    findHomeByAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    countHome: (req: Request, res: Response) => Promise<void>;
    findCategory: (req: Request, res: Response) => Promise<void>;
    findHomeByIdUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findHomeForRent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findHomeRented: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: HomeController;
export default _default;
