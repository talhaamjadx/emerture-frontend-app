import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Expert extends VuexModule {
    expert = null
    filteredExperts = []
    expertise = []
    industrySectors = []
    get expertProfileGetter() {
        return this.expert
    }
    get expertiseGetter() {
        return this.expertise
    }
    get industrySectorsGetter() {
        return this.industrySectors
    }
    get filteredExpertsGetter() {
        return this.filteredExperts
    }
    @Mutation
    [Mutations.SET_EXPERT_PROFILE](payload): void {
        this.expert = payload
    }
    @Mutation
    [Mutations.SET_EXPERTS](payload): void {
        this.filteredExperts = payload
    }
    @Mutation
    [Mutations.SET_EXPERTISE](payload): void {
        this.expertise = payload
    }
    @Mutation
    [Mutations.SET_INDUSTRY_SECTORS](payload): void {
        this.industrySectors = payload
    }
    @Action
    [Actions.CREATE_EXPERT_PROFILE](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
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
        ApiService.setHeader("multipart/form-data")
        return ApiService.post(`/expert/${id}`, data)
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
    @Action
    [Actions.GET_EXPERT_PROFILE_GLOBAL](id): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/expert-profile/${id}`)
            .then(expert => {
                return expert.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
    @Action
    [Actions.GET_EXPERTISE](): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/expertise`)
            .then(expertise => {
                this.context.commit(Mutations.SET_EXPERTISE, objectPath.get(expertise, 'data.data', []).filter(e => (e as { isActive })?.isActive == 1))
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
    @Action
    [Actions.GET_INDUSTRY_SECTORS](): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.get(`/industry-sectors`)
            .then(industrySectors => {
                this.context.commit(Mutations.SET_INDUSTRY_SECTORS, objectPath.get(industrySectors, 'data.data', []).filter(is => (is as { isActive })?.isActive == 1))
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
    @Action
    [Actions.FIND_EXPERTS](payload): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.post(`/find-expert`, payload)
            .then(experts => {
                this.context.commit(Mutations.SET_EXPERTS, experts.data.data)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
    @Action
    [Actions.FOUNDER_REQUISITE_EXPERT](payload): Promise<AxiosResponse> {
        ApiService.setHeader("appilcation/json")
        return ApiService.post(`/founder-requisite-expert`, payload)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.responses
            })
    }
}