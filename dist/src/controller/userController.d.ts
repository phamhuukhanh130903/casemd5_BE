import { Request, Response } from "express";
declare class UserController {
    private userServices;
    private orderServices;
    constructor();
    getAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOldPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkNewPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    editUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    removeUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
