import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Business extends VuexModule {
    businesses = []
    investmentOppertunities = []
    get getInvestmentOppertunities() {
        return this.investmentOppertunities
    }
    get getBusinesses() {
        return this.businesses
    }
    @Mutation
    [Mutations.SET_FOUNDER_BUSINESSES](payload): void {
        this.businesses = payload
    }
    @Mutation
    [Mutations.SET_INVESTMENT_OPPERTUNITIES](payload): void {
        this.investmentOppertunities = payload
    }
    @Action
    [Actions.CREATE_FOUNDER_BUSINESS](payload: AxiosRequestConfig): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
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
    @Action
    [Actions.UPDATE_FOUNDER_BUSINESS]({ id, payload }): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
        return ApiService.post(`/founder-business/${id}`, payload)
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
    [Actions.GET_FOUNDER_BUSINESSES]({ page, perPage }): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/founder-business?page=${page}&perPage=${perPage}`)
            .then(businesses => {
                this.context.commit(Mutations.SET_FOUNDER_BUSINESSES, businesses.data.data)
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.GET_FUNDING_ROUNDS](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/funding-rounds?founderBusinessId=${id}`)
            .then(fundingRounds => {
                return fundingRounds.data.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.CREATE_FUNDING_ROUND](payload): Promise<AxiosResponse> {
        ApiService.setHeader("multipart/form-data")
        return ApiService.post(`/funding-rounds`, payload)
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
    [Actions.DELETE_FUNDING_ROUND](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.delete(`/funding-rounds/${id}`)
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
    [Actions.UPDATE_FUNDING_ROUND]({ id, data }): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.put(`/funding-rounds/${id}`, data)
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
    [Actions.FIND_INVESTMENT_OPPERTUNITIES](payload): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post(`/investment-opportunities`, payload)
            .then(investmentOppertunities => {
                this.context.commit(Mutations.SET_INVESTMENT_OPPERTUNITIES, investmentOppertunities.data.data);
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.INVESTMENT_OPPERTUNITY_CONNECT](payload): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post(`/investor-business-connection`, payload)
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
    [Actions.CONNECTED_INVESTMENT_OPPERTUNITIES](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/investor-business-connection`)
            .then(connectedInvestmentOppertunities => {
                return connectedInvestmentOppertunities.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.GET_INVESTMENT_OPPERTUNITY_PROFILE](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/founder-business/${id}`)
            .then(investmentOppertunity => {
                return investmentOppertunity.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.GET_FUNDING_ROUND_INVESTMENT](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/funding-round-investment/${id}`)
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
    [Actions.UPDATE_FUNDING_ROUND_INVESTMENT]({ id, data }): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.put(`/funding-round-investment/${id}`, data)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    } @Action
    [Actions.DELETE_FUNDING_ROUND_INVESTMENT](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.delete(`/funding-round-investment/${id}`)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    } @Action
    [Actions.CREATE_FUNDING_ROUND_INVESTMENT](payload): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post(`/funding-round-investment`, payload)
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