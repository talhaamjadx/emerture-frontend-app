import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Role extends VuexModule {
    roles = []
    get getRolesData() {
        console.log(this.roles, "in here")
        return this.roles
    }
    @Mutation
    [Mutations.SET_DEFAULT_ROLE_STORE](): void {
        this.roles = []
    }
    @Mutation
    [Mutations.SET_ROLES](payload): void {
        this.roles = payload
    }
    @Action
    [Actions.GET_ROLES](): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/roles`)
            .then(roles => {
                this.context.commit(Mutations.SET_ROLES, objectPath.get(roles, "data.data", []).filter((role) => (role as { isActive })?.isActive == 1));
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.ATTACH_ROLE]({ id }): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/attach-role?roleId=${id}`)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
}