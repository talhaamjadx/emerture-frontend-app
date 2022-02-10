import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Auth extends VuexModule {
    founder = {}
    get getFounder() {
        return this.founder
    }
    @Mutation
    [Mutations.SET_FOUNDER](payload): void {
        this.founder = payload
    }
    @Action
    [Actions.CREATE_FOUNDER](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/temp-founder-business", payload)
            .then(founder => {
                console.log({ founder })
                this.context.commit(Mutations.SET_FOUNDER, founder.data.data)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.UPLOAD_FILE](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
        return ApiService.post("/file", payload)
            .then(fileUrl => {
                return fileUrl.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
}