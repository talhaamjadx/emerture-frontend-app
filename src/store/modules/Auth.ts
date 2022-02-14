import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

interface AuthInterface {
    isLoggedIn: boolean
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

const errorHandler = (err, context) => {
    if (err?.response?.data?.code == 400 || err?.response?.data?.code == 500)
        context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.message", []));
    else if (err?.response?.data?.code == 422)
        context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors[0]", []));
    else {
        context.commit(Mutations.SET_ERROR, 'An error has occured!');
    }
    return err.response
}

@Module
export default class Auth extends VuexModule implements AuthInterface {
    isLoggedIn = false
    user = {} as AuthUser
    get getIsLoggedIn() {
        return this.isLoggedIn
    }
    get getUser(): AuthUser {
        return this.user
    }
    @Mutation
    [Mutations.SET_DEFAULT_AUTH]() {
        this.user = {} as AuthUser
        this.isLoggedIn = false
    }
    @Mutation
    [Mutations.SET_AUTH_USER](payload) {
        this.user = payload
    }
    @Mutation
    [Mutations.IS_LOGGED_IN](payload) {
        this.isLoggedIn = payload
    }
    @Action
    [Actions.SIGNUP](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.post("/register", payload)
            .then(signup => {
                window.localStorage.setItem("access_token", objectPath.get(signup, "data.data.accessToken", ""))
                window.localStorage.setItem('verification_code_time', objectPath.get(signup, "data.data.sendTime", ""))
                window.localStorage.setItem('verification_code_limit', objectPath.get(signup, "data.data.timeLimit", ""))
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.SIGNIN](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        return ApiService.post("/login", payload)
            .then(signin => {
                console.log(signin)
                window.localStorage.setItem("access_token", objectPath.get(signin, "data.data.access_token", ""))
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.AUTH_USER](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get("/auth-user")
            .then(auth => {
                this.context.commit(Mutations.SET_AUTH_USER, auth.data.data)
                this.context.commit(Mutations.IS_LOGGED_IN, true)
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.VERIFY_AUTH](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/verify-code", payload)
            .then(verifyAuth => {
                console.log({ verifyAuth })
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.RESEND_VERIFY_CODE](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get("/resend-code")
            .then(resendCode => {
                console.log({ resendCode })
                return resendCode
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.SIGNOUT](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get("/logout")
            .then(logout => {
                console.log({ logout })
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.DEACTIVATE](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get("/deactivate-account")
            .then(() => {
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.FORGOT_PASSWORD](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/forgot-password", payload)
            .then(forgotPassword => {
                console.log({ forgotPassword })
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.RESET_PASSWORD](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/reset-password", payload)
            .then(resetPassword => {
                console.log({ resetPassword })
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.CHANGE_PASSWORD](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/change-password", payload)
            .then(changePassword => {
                console.log({ changePassword })
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.UPDATE_PROFILE](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
        return ApiService.post("/update-profile", payload)
            .then(updateProfile => {
                console.log({ updateProfile })
                return true
            })
            .catch(err => {
                console.log(err.response.data, "in here")
                errorHandler(err, this.context)
                return err.response
            })
    }
}