"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const home_1 = require("../model/home");
class UserServices {
    constructor() {
        this.getAll = async () => {
            let sql = `select * 
                   from  user where role = 'user'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getMyProfile = async (idUser) => {
            let users = await this.userRepository.findOneBy({ idUser: idUser });
            return users;
        };
        this.checkOldPassword = async (idUser, password) => {
            let userCheck = await this.userRepository.findOneBy({ idUser: idUser });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
                if (passwordCompare) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        this.checkNewPassword = async (idUser, password) => {
            let userCheck = await this.userRepository.findOneBy({ idUser: idUser });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
                if (passwordCompare) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        this.changePassword = async (idUser, password) => {
            let user = await this.userRepository.findOneBy({ idUser: idUser });
            if (!user) {
                return "User not found";
            }
            else {
                user.password = await bcrypt_1.default.hash(password, 10);
                return this.userRepository.update({ idUser: idUser }, user);
            }
        };
        this.register = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (userCheck) {
                return "Username already registered";
            }
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.userRepository.save(user);
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(user.password, userCheck.password);
                if (!passwordCompare) {
                    return "Wrong password";
                }
                else {
                    let payload = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role
                    };
                    const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000000
                    });
                    let userRes = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role,
                        avatar: userCheck.avatar,
                        token: token
                    };
                    return userRes;
                }
            }
        };
        this.edit = async (id, user) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            user.password = checkUser.password;
            await this.userRepository.update({ idUser: id }, user);
            checkUser = await this.userRepository.findOneBy({ idUser: id });
            let payload = {
                idUser: checkUser.idUser,
                username: checkUser.username,
                role: checkUser.role
            };
            const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                expiresIn: 36000000
            });
            let userRes = {
                idUser: checkUser.idUser,
                username: checkUser.username,
                role: checkUser.role,
                avatar: checkUser.avatar,
                token: token
            };
            return userRes;
        };
        this.remove = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return this.userRepository.delete({ idUser: id });
        };
        this.showHome = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            else {
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.homeRepository = data_source_1.AppDataSource.getRepository(home_1.Home);
    }
}
exports.default = new UserServices();
//# sourceMappingURL=userService.js.map