import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Auth extends VuexModule {
    founder = {}
    businessDraft = {}
    get getFounder() {
        return this.founder
    }
    get businessDraftGetter() {
        return this.businessDraft
    }
    @Mutation
    [Mutations.SET_FOUNDER](payload): void {
        this.founder = payload
    }
    @Mutation
    [Mutations.SET_BUSINESS_DRAFT](payload): void {
        this.businessDraft = payload
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
    [Actions.CREATE_BUSINESS_DRAFT](data): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post("/business-draft", data)
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
    [Actions.DELETE_BUSINESS_DRAFT](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.delete("/business-draft-delete")
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
    [Actions.GET_BUSINESS_DRAFT](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get("/business-draft")
            .then(businessDraft => {
                this.context.commit(Mutations.SET_BUSINESS_DRAFT, JSON.parse(businessDraft?.data?.data?.business ?? '{}'))
                return true
            })
            .catch(err => {
                if(err?.response?.status == 400)
                this.context.commit(Mutations.SET_BUSINESS_DRAFT, {})
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