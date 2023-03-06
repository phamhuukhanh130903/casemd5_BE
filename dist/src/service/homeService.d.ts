declare class HomeService {
    private homeRepository;
    constructor();
    getAll: () => Promise<any>;
    getAllHome: (limit: any, offset: any) => Promise<any>;
    getMyHome: (idUser: any, limit: any, offset: any) => Promise<{
        homes: any;
        totalPage: number;
    }>;
    countHomes: (limit: any) => Promise<number>;
    save: (home: any) => Promise<any>;
    checkUser: (idUser: any, idHome: any) => Promise<boolean>;
    updateHome: (idHome: any, newHome: any) => Promise<any>;
    deleteHome: (idHome: any) => Promise<any>;
    findById: (idHome: any) => Promise<any>;
    findHomeByAddress: (value: any, limit: any, offset: any) => Promise<{
        homes: any;
        totalPage: number;
    }>;
    checkCount: (idHome: any) => Promise<any>;
    findHomeForRent: (limit: any, offset: any) => Promise<{
        homes: any;
        totalPage: number;
    }>;
    findHomeRented: (limit: any, offset: any) => Promise<{
        homes: any;
        totalPage: number;
    }>;
    top4Home: () => Promise<any>;
    changeStatusHome: (idHome: any) => Promise<any>;
}
declare const _default: HomeService;
export default _default;
