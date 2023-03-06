"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homeService_1 = __importDefault(require("../service/homeService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
class HomeController {
    constructor() {
        this.getAllHome = async (req, res) => {
            try {
                let orders;
                let data;
                let homes = await homeService_1.default.getAll();
                let categories = await categoryService_1.default.getAllCategory();
                if (req["decoded"]) {
                    data = [homes, categories, orders];
                }
                else {
                    data = [homes, categories];
                }
                res.status(200).json(homes);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getMyHome = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let homes = await homeService_1.default.getMyHome(req["decoded"].idUser, limit, offset);
                return res.status(201).json({
                    homes: homes.homes,
                    currentPage: page,
                    totalPage: homes.totalPage,
                });
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.index = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let homes = await homeService_1.default.getAllHome(limit, offset);
                let totalPage = await homeService_1.default.countHomes(limit);
                res.status(201).json({
                    homes: homes,
                    currentPage: page,
                    totalPage: totalPage,
                });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.createHome = async (req, res) => {
            try {
                let homes = await homeService_1.default.save(req.body);
                res.status(200).json(homes);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editHome = async (req, res) => {
            try {
                let idHome = req.params.idHome;
                let idUser = req["decoded"].idUser;
                let check = await this.homeService.checkUser(idUser, idHome);
                if (check) {
                    let homes = await this.homeService.updateHome(idHome, req.body);
                    res.status(200).json(homes);
                }
                else {
                    res.status(401).json("invalid");
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.deleteHome = async (req, res) => {
            try {
                let idHome = req.params.idHome;
                let idUser = req["decoded"].idUser;
                let check = await this.homeService.checkUser(idUser, idHome);
                if (check || req["decoded"].role === "admin") {
                    let homes = await this.homeService.deleteHome(idHome);
                    res.status(200).json(homes);
                }
                else {
                    res.status(401).json("invalid");
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByIdHome = async (req, res) => {
            try {
                let idHome = req.params.idHome;
                let homes = await homeService_1.default.findById(idHome);
                res.status(200).json(homes);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findHomeByAddress = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let address = req.query.address;
                let homes = await homeService_1.default.findHomeByAddress(address, limit, offset);
                return res.status(201).json({
                    homes: homes.homes,
                    currentPage: page,
                    totalPage: homes.totalPage,
                    address: address
                });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.countHome = async (req, res) => {
            try {
                let idHome = req.params.idHome;
                let counts = await this.homeService.checkCount(idHome);
                res.status(200).json(counts);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findCategory = async (req, res) => {
            try {
                let categories = await categoryService_1.default.getAllCategory();
                res.status(200).json(categories);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findHomeByIdUser = async (req, res) => {
            try {
                let homes = await this.homeService.findHomeByIdUser(req.params.idUser);
                return res.status(200).json(homes);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findHomeForRent = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let homes = await homeService_1.default.findHomeForRent(limit, offset);
                return res.status(201).json({
                    homes: homes.homes,
                    currentPage: page,
                    totalPage: homes.totalPage
                });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.findHomeRented = async (req, res) => {
            try {
                let limit = 6;
                let offset = 0;
                let page = 1;
                if (req.query.page) {
                    page = +req.query.page;
                    offset = (+page - 1) * limit;
                }
                let homes = await homeService_1.default.findHomeRented(limit, offset);
                return res.status(201).json({
                    homes: homes.homes,
                    currentPage: page,
                    totalPage: homes.totalPage
                });
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.homeService = homeService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=homeController.js.map