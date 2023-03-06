declare class UserServices {
    private userRepository;
    private homeRepository;
    constructor();
    getAll: () => Promise<any>;
    getMyProfile: (idUser: any) => Promise<any>;
    checkOldPassword: (idUser: any, password: any) => Promise<boolean | "User not found">;
    checkNewPassword: (idUser: any, password: any) => Promise<boolean | "User not found">;
    changePassword: (idUser: any, password: any) => Promise<any>;
    register: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User not found" | "Wrong password" | {
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
    }>;
    edit: (id: any, user: any) => Promise<{
        idUser: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
    }>;
    remove: (id: any) => Promise<any>;
    showHome: (id: any) => Promise<any>;
}
declare const _default: UserServices;
export default _default;
