"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const home_1 = require("../model/home");
class HomeService {
    constructor() {
        this.getAll = async () => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory`;
            let homes = await this.homeRepository.query(sql);
            if (!homes) {
                return "No homes found";
            }
            return homes;
        };
        this.getAllHome = async (limit, offset) => {
            let sql = `select * from home h join user u on h.idUser = u.idUser join category c on h.idCategory = c.idCategory LIMIT ${limit} OFFSET ${offset}`;
            let homes = await this.homeRepository.query(sql);
            if (!homes) {
                return "No homes found";
            }
            return homes;
        };
        this.getMyHome = async (idUser, limit, offset) => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory join user u on h.idUser = u.idUser where u.idUser = ${idUser} LIMIT ${limit} OFFSET ${offset}`;
            let homes = await this.homeRepository.query(sql);
            sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory join user u on h.idUser = u.idUser where u.idUser = ${idUser}`;
            let counts = await this.homeRepository.query(sql);
            let totalPage = Math.ceil(+counts[0].c / limit);
            if (!homes) {
                return null;
            }
            return { homes: homes, totalPage: totalPage };
        };
        this.countHomes = async (limit) => {
            let sql = `select COUNT(idHome) c from home`;
            let homes = await this.homeRepository.query(sql);
            let totalPage = Math.ceil(+homes[0].c / limit);
            return totalPage;
        };
        this.save = async (home) => {
            return this.homeRepository.save(home);
        };
        this.checkUser = async (idUser, idHome) => {
            let checkIdUser = await this.homeRepository.findOneBy({ idHome: idHome });
            if (checkIdUser.idUser === idUser) {
                return true;
            }
            return false;
        };
        this.updateHome = async (idHome, newHome) => {
            let homes = await this.homeRepository.findOneBy({ idHome: idHome });
            if (!homes) {
                return null;
            }
            newHome.count = homes.count;
            return this.homeRepository.update({ idHome: idHome }, newHome);
        };
        this.deleteHome = async (idHome) => {
            let homes = await this.homeRepository.findOneBy({ idHome: idHome });
            if (!homes) {
                return null;
            }
            return this.homeRepository.delete({ idHome: idHome });
        };
        this.findById = async (idHome) => {
            let homes = await this.homeRepository.findOneBy({ idHome: idHome });
            return homes;
        };
        this.findHomeByAddress = async (value, limit, offset) => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%' LIMIT ${limit} OFFSET ${offset}`;
            let homes = await this.homeRepository.query(sql);
            sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%'`;
            let counts = await this.homeRepository.query(sql);
            let totalPage = Math.ceil(+counts[0].c / limit);
            if (!homes) {
                return null;
            }
            return { homes: homes, totalPage: totalPage };
        };
        this.checkCount = async (idHome) => {
            let homes = await this.homeRepository.findOneBy({ idHome: idHome });
            if (!homes) {
                return null;
            }
            homes.count++;
            return await this.homeRepository.update({ idHome: idHome }, homes);
        };
        this.findHomeForRent = async (limit, offset) => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.status = 'For rent' LIMIT ${limit} OFFSET ${offset}`;
            let homes = await this.homeRepository.query(sql);
            sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.status = 'For rent'`;
            let counts = await this.homeRepository.query(sql);
            let totalPage = Math.ceil(+counts[0].c / limit);
            if (!homes) {
                return null;
            }
            return { homes: homes, totalPage: totalPage };
        };
        this.findHomeRented = async (limit, offset) => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.status = 'Rented' LIMIT ${limit} OFFSET ${offset}`;
            let homes = await this.homeRepository.query(sql);
            sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.status = 'Rented'`;
            let counts = await this.homeRepository.query(sql);
            let totalPage = Math.ceil(+counts[0].c / limit);
            if (!homes) {
                return null;
            }
            return { homes: homes, totalPage: totalPage };
        };
        this.top4Home = async () => {
            let sql = `select * from home h join category c on h.idCategory = c.idCategory join image i on h.idHome = i.idHome order by count desc limit 4`;
            let homes = await this.homeRepository.query(sql);
            if (!homes) {
                return null;
            }
            return homes;
        };
        this.changeStatusHome = async (idHome) => {
            let home = await this.homeRepository.findOneBy({ idHome: idHome });
            if (!home) {
                return null;
            }
            if (home.status === 'Rented') {
                home.status = 'For rent';
            }
            else {
                home.status = 'Rented';
            }
            return await this.homeRepository.update({ idHome: idHome }, home);
        };
        this.homeRepository = data_source_1.AppDataSource.getRepository(home_1.Home);
    }
}
exports.default = new HomeService();
//# sourceMappingURL=homeService.js.map