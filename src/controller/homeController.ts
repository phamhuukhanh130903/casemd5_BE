import {Request,Response} from "express";
import homeService from "../service/homeService";
import categoryService from "../service/categoryService";

class HomeController {
    private homeService;
    constructor() {
        this.homeService = homeService;
    }
    getAllHome = async (req: Request, res: Response) => {
        try {
            let orders;
            let data;
            let homes = await homeService.getAll();
            let categories = await categoryService.getAllCategory();
            if (req["decoded"]) {
                data = [homes,categories, orders];
            } else {
                data = [homes,categories];
            }
            res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    getMyHome = async (req: Request, res: Response) => {
        try {
            let limit = 6;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let homes = await homeService.getMyHome(req["decoded"].idUser, limit, offset);
            return res.status(201).json({
                homes: homes.homes,
                currentPage: page,
                totalPage: homes.totalPage,
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    index = async (req: Request, res: Response) => {
        try {
            let limit = 6;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let homes = await homeService.getAllHome(limit, offset);
            let totalPage = await homeService.countHomes(limit);
            res.status(201).json({
                homes: homes,
                currentPage: page,
                totalPage: totalPage,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    };
    createHome = async (req: Request, res: Response) => {
        try {
            let homes = await homeService.save(req.body);
            res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    editHome = async (req: Request, res: Response) => {
        try {
            let idHome = req.params.idHome;
            let idUser = req["decoded"].idUser;
            let check = await this.homeService.checkUser(idUser, idHome);
            if (check) {
                let homes = await this.homeService.updateHome(idHome, req.body);
                res.status(200).json(homes);
            } else {
                res.status(401).json("invalid");
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    deleteHome = async (req: Request, res: Response) => {
        try {
            let idHome = req.params.idHome;
            let idUser = req["decoded"].idUser;
            let check = await this.homeService.checkUser(idUser, idHome);
            if (check || req["decoded"].role === "admin") {
                let homes = await this.homeService.deleteHome(idHome);
                res.status(200).json(homes);
            } else {
                res.status(401).json("invalid");
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findByIdHome = async (req: Request, res: Response) => {
        try {
            let idHome = req.params.idHome;
            let homes = await homeService.findById(idHome);
            res.status(200).json(homes);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findHomeByAddress = async (req: Request,res: Response) => {
        try {
            let limit = 6;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let address = req.query.address;
            let homes = await homeService.findHomeByAddress(address, limit, offset);
            return res.status(201).json({
                homes: homes.homes,
                currentPage: page,
                totalPage: homes.totalPage,
                address: address
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    countHome = async (req: Request, res: Response) => {
        try {
            let idHome = req.params.idHome;
            let counts = await this.homeService.checkCount(idHome);
            res.status(200).json(counts);
        } catch (err) {
            res.status(500).json(err.message);
        }
    };
    findCategory = async (req: Request, res: Response) => {
        try {
            let categories = await categoryService.getAllCategory();
            res.status(200).json(categories);
        } catch (e) {
            res.status(500).json(e.message);
        }
    };
    findHomeByIdUser = async (req: Request, res: Response) => {
        try {
            let homes = await this.homeService.findHomeByIdUser(req.params.idUser);
            return res.status(200).json(homes);
        } catch (err) {
            res.status(500).json(err.message);
        }
    };
    findHomeForRent = async (req: Request,res: Response) => {
        try {
            let limit = 6;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let homes = await homeService.findHomeForRent(limit, offset);
            return res.status(201).json({
                homes: homes.homes,
                currentPage: page,
                totalPage: homes.totalPage
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    findHomeRented = async (req: Request,res: Response) => {
        try {
            let limit = 6;
            let offset = 0;
            let page = 1;
            if (req.query.page) {
                page = +req.query.page;
                offset = (+page - 1) * limit;
            }
            let homes = await homeService.findHomeRented(limit, offset);
            return res.status(201).json({
                homes: homes.homes,
                currentPage: page,
                totalPage: homes.totalPage
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

export default new HomeController();

