import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

@Module
export default class Business extends VuexModule {
    businesses = []
    investmentOpportunities = []
    connectedInvestmentOpportunities = []
    get getInvestmentOpportunities() {
        return this.investmentOpportunities
    }
    get getConnectedInvestmentOpportunities() {
        return this.connectedInvestmentOpportunities
    }
    get getBusinesses() {
        return this.businesses
    }
    @Mutation
    [Mutations.SET_DEFAULT_BUSINESS_STORE](): void {
        this.businesses = []
        this.investmentOpportunities = []
        this.connectedInvestmentOpportunities = []
    }
    @Mutation
    [Mutations.SET_FOUNDER_BUSINESSES](payload): void {
        this.businesses = payload
    }
    @Mutation
    [Mutations.SET_CONNECTED_INVESTMENT_OPPORTUNITIES](payload): void {
        this.connectedInvestmentOpportunities = payload
    }
    @Mutation
    [Mutations.SET_INVESTMENT_OPPORTUNITIES](payload): void {
        this.investmentOpportunities = payload
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
    [Actions.FIND_INVESTMENT_OPPORTUNITIES](payload): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.post(`/investment-opportunities`, payload)
            .then(investmentOpportunities => {
                this.context.commit(Mutations.SET_INVESTMENT_OPPORTUNITIES, investmentOpportunities.data.data);
                return true
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.INVESTMENT_OPPORTUNITY_CONNECT](payload): Promise<AxiosResponse> {
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
    [Actions.CONNECTED_INVESTMENT_OPPORTUNITIES](): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/investor-business-connection`)
            .then(connectedInvestmentOpportunities => {
                this.context.commit(Mutations.SET_CONNECTED_INVESTMENT_OPPORTUNITIES, connectedInvestmentOpportunities?.data?.data ?? [])
                return connectedInvestmentOpportunities.data
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
    @Action
    [Actions.GET_INVESTMENT_OPPORTUNITY_PROFILE](id): Promise<AxiosResponse> {
        ApiService.setHeader("application/json")
        return ApiService.get(`/founder-business/${id}`)
            .then(investmentOpportunity => {
                return investmentOpportunity.data
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
            .then(response => {
                return response?.data ?? {}
            })
            .catch(err => {
                console.log(err)
                this.context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.errors", []));
                return err.response
            })
    }
}