import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Configuration extends VuexModule {
    @Action
    [Actions.GET_CONFIGURATION_BY_KEY](key): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/configurations/get-by-key/${key}`)
            .then(config => {
                return config.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
}