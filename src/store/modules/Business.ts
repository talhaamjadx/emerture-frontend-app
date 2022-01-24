import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Business extends VuexModule {
    errors = []
    get getErrorsRoles() {
        return this.errors
    }
    @Mutation
    [Mutations.SET_ERROR](payload): void {
        this.errors = payload
    }
    @Action
    [Actions.CREATE_FOUNDER_BUSINESS](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
        return ApiService.post("/founder-business", payload)
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