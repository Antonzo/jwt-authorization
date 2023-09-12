import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../service/AuthService";

export default class Index {
    user = {} as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log("login: ", response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log("registration: ", response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log("logout: ", response)
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e);
        }
    }
}