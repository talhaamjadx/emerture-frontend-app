import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Investor extends VuexModule {
    errors = []
    investor = null
    get getErrorsRoles() {
        return this.errors
    }
    get investorProfileGetter() {
        return this.investor
    }
    @Mutation
    [Mutations.SET_ERROR](payload): void {
        this.errors = payload
    }
    @Mutation
    [Mutations.SET_INVESTOR_PROFILE](payload): void {
        this.investor = payload
    }
    @Action
    [Actions.CREATE_INVESTOR_PROFILE](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/investor", payload)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.UPDATE_INVESTOR_PROFILE]({ id, data }): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.put(`/investor/${id}`, data)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.GET_INVESTOR_PROFILE]({ id }): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/investor/${id}`)
            .then(investor => {
                this.context.commit(Mutations.SET_INVESTOR_PROFILE, investor.data.data)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
}