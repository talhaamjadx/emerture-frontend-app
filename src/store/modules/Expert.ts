import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Role extends VuexModule {
    errors = []
    expert = null
    get getErrorsRoles() {
        return this.errors
    }
    get exportProfileGetter() {
        return this.expert
    }
    @Mutation
    [Mutations.SET_ERROR](payload): void {
        this.errors = payload
    }
    @Mutation
    [Mutations.SET_EXPERT_PROFILE](payload): void {
        this.expert = payload
    }
    @Action
    [Actions.CREATE_EXPERT_PROFILE](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.post("/expert", payload)
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
    [Actions.UPDATE_EXPERT_PROFILE]({ id, data }): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.put(`/expert/${id}`, data)
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
    [Actions.GET_EXPERT_PROFILE]({ id }): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/expert/${id}`)
            .then(expert => {
                this.context.commit(Mutations.SET_EXPERT_PROFILE, expert.data.data)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
}