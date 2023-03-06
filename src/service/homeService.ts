
import { AppDataSource } from "../data-source";
import { Home } from "../model/home";
class HomeService {
    private homeRepository;
    constructor() {
        this.homeRepository = AppDataSource.getRepository(Home)
    }
    getAll = async () => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return "No homes found";
        }
        return homes;
    };
    getAllHome = async (limit, offset) => {
        let sql = `select * from home h join user u on h.idUser = u.idUser join category c on h.idCategory = c.idCategory LIMIT ${limit} OFFSET ${offset}`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return "No homes found";
        }
        return homes;
    };
    getMyHome = async (idUser, limit, offset) => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory join user u on h.idUser = u.idUser where u.idUser = ${idUser} LIMIT ${limit} OFFSET ${offset}`;
        let homes = await this.homeRepository.query(sql);
        sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory join user u on h.idUser = u.idUser where u.idUser = ${idUser}`;
        let counts = await this.homeRepository.query(sql);
        let totalPage = Math.ceil(+counts[0].c / limit)
        if (!homes) {
            return null;
        }
        return {homes: homes, totalPage: totalPage};
    };
    countHomes = async (limit) => {
        let sql = `select COUNT(idHome) c from home`;
        let homes = await this.homeRepository.query(sql);
        let totalPage = Math.ceil(+homes[0].c / limit);
        return totalPage;
    };
    save = async (home) => {
        return this.homeRepository.save(home);
    };
    checkUser = async (idUser, idHome) => {
        let checkIdUser = await this.homeRepository.findOneBy({ idHome: idHome });
        if (checkIdUser.idUser === idUser) {
            return true;
        }
        return false;
    };
    updateHome = async (idHome, newHome) => {
        let homes = await this.homeRepository.findOneBy({ idHome: idHome });
        if (!homes) {
            return null;
        }
        newHome.count = homes.count;
        return this.homeRepository.update({ idHome: idHome }, newHome);
    };
    deleteHome = async (idHome) => {
        let homes = await this.homeRepository.findOneBy({ idHome: idHome });
        if (!homes) {
            return null;
        }
        return this.homeRepository.delete({ idHome: idHome });
    };
    findById = async (idHome) => {
        let homes = await this.homeRepository.findOneBy({ idHome: idHome });
        return homes;
    };
    findHomeByAddress = async (value, limit, offset) => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%' LIMIT ${limit} OFFSET ${offset}`;
        let homes = await this.homeRepository.query(sql);
        sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.address like '%${value}%'`;
        let counts = await this.homeRepository.query(sql);
        let totalPage = Math.ceil(+counts[0].c / limit)
        if (!homes) {
            return null;
        }
        return {homes: homes, totalPage: totalPage};
    };
    checkCount = async (idHome) => {
        let homes = await this.homeRepository.findOneBy({ idHome: idHome });
        if (!homes) {
            return null;
        }
        homes.count++;
        return await this.homeRepository.update({ idHome: idHome }, homes);
    };
    findHomeForRent = async (limit, offset) => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.status = 'For rent' LIMIT ${limit} OFFSET ${offset}`;
        let homes = await this.homeRepository.query(sql);
        sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.status = 'For rent'`;
        let counts = await this.homeRepository.query(sql);
        let totalPage = Math.ceil(+counts[0].c / limit)
        if (!homes) {
            return null;
        }
        return {homes: homes, totalPage: totalPage};
    };
    findHomeRented = async (limit, offset) => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory where h.status = 'Rented' LIMIT ${limit} OFFSET ${offset}`;
        let homes = await this.homeRepository.query(sql);
        sql = `select count(*) c from home h join category c on h.idCategory = c.idCategory where h.status = 'Rented'`;
        let counts = await this.homeRepository.query(sql);
        let totalPage = Math.ceil(+counts[0].c / limit)
        if (!homes) {
            return null;
        }
        return {homes: homes, totalPage: totalPage};
    };
    top4Home = async () => {
        let sql = `select * from home h join category c on h.idCategory = c.idCategory join image i on h.idHome = i.idHome order by count desc limit 4`;
        let homes = await this.homeRepository.query(sql);
        if (!homes) {
            return null;
        }
        return homes;
    };
    changeStatusHome = async (idHome)=> {
        let home = await this.homeRepository.findOneBy({ idHome: idHome });
        if (!home) {
            return null
        }
        if (home.status === 'Rented'){
            home.status = 'For rent';
        } else {
            home.status = 'Rented'
        }
        return await this.homeRepository.update({idHome: idHome}, home)
    }
}



export default new HomeService();