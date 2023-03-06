"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const orderService_1 = __importDefault(require("../service/orderService"));
class UserController {
    constructor() {
        this.getAllUser = async (req, res) => {
            try {
                let response = await this.userServices.getAll();
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.showMyProfile = async (req, res) => {
            try {
                let response = await this.userServices.getMyProfile(req.params.idUser);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkOldPassword = async (req, res) => {
            try {
                let response = await this.userServices.checkOldPassword(req.params.idUser, req.body.password);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkNewPassword = async (req, res) => {
            try {
                let response = await this.userServices.checkNewPassword(req.params.idUser, req.body.password);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changePassword = async (req, res) => {
            try {
                let checkOldPassword = await this.userServices.checkOldPassword(req.params.idUser, req.body.oldPassword);
                let checkNewPassword = await this.userServices.checkNewPassword(req.params.idUser, req.body.newPassword);
                if (checkOldPassword === "User not found") {
                    return res.status(200).json("User not found");
                }
                else if (!checkOldPassword) {
                    return res.status(200).json("Old password does not match");
                }
                else {
                    if (checkNewPassword === "User not found") {
                        return res.status(200).json("User not found");
                    }
                    else if (checkNewPassword) {
                        return res.status(200).json("New password is match with old password");
                    }
                    else {
                        await this.userServices.changePassword(req.params.idUser, req.body.newPassword);
                        return res.status(200).json("Success");
                    }
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let user = await this.userServices.register(req.body);
                let order = await this.orderServices.save({ idUser: user.idUser });
                return res.status(201).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let response = await this.userServices.checkUser(req.body);
                if (response === "User not found" || response === "Wrong password") {
                    return res.status(200).json(response);
                }
                else {
                    let order = await this.orderServices.findOrderByIdUser(response.idUser);
                    return res.status(200).json(Object.assign(Object.assign({}, response), { idOrder: order.idOrder }));
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editUser = async (req, res) => {
            try {
                let user = await this.userServices.edit(req.params.idUser, req.body);
                return res.status(201).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.removeUser = async (req, res) => {
            try {
                let id = req.params.idUser;
                let user = await this.userServices.remove(id);
                return res.status(200).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userServices = userService_1.default;
        this.orderServices = orderService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map