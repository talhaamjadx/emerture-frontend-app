import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

interface AuthInterface {
    isLoggedIn: boolean
    errors: Array<unknown>
    user: AuthUser
}

interface AuthUser {
    id: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    telephone: string,
    introduction: string,
    linkedInProfileUlr: string,
    profileImage: string,
    isActive: boolean,
    loginBy: string,
    userRoles: Array<unknown>
}

@Module
export default class Auth extends VuexModule implements AuthInterface {
    isLoggedIn = false
    errors = []
    user = {} as AuthUser
    get getErrors() {
        return this.errors
    }
    get getIsLoggedIn() {
        return this.isLoggedIn
    }
    get getUser() {
        return this.user
    }
    @Mutation
    [Mutations.SET_DEFAULT_AUTH]() {
        this.user = {} as AuthUser
        this.isLoggedIn = false
        this.errors = []
    }
    @Mutation
    [Mutations.SET_AUTH_USER](payload) {
        this.user = { ...payload }
    }
    @Mutation
    [Mutations.IS_LOGGED_IN](payload) {
        this.isLoggedIn = payload
    }
    @Mutation
    [Mutations.SET_ERROR](payload): void {
        this.errors = payload
    }
    @Action
    [Actions.SIGNUP](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.post("/register", payload)
            .then(signup => {
                console.log(signup)
                window.localStorage.setItem("access_token", objectPath.get(signup, "data.data.accessToken", ""))
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                console.log({ err })
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.SIGNIN](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.post("/login", payload)
            .then(signin => {
                console.log(signin)
                window.localStorage.setItem("access_token", objectPath.get(signin, "data.access_token", ""))
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.AUTH_USER](): Promise<AxiosResponse> {
        ApiService.setHeader()
        return ApiService.get("/auth-user")
            .then(auth => {
                console.log(auth)
                this.context.commit(Mutations.SET_AUTH_USER, objectPath.get(auth, "data.data", {}))
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
}