import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Actions, Mutations } from "../enums/StoreEnums"
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiService from "@/core/services/ApiService";
import objectPath from "object-path";

const errorHandler = (err, context) => {
    if (err?.response?.data?.code == 400 || err?.response?.data?.code == 500)
        context.commit(Mutations.SET_ERROR, objectPath.get(err, "response.data.message", []));
    else if (err?.response?.data?.code == 422) {
        const errors = objectPath.get(err, "response.data.errors", {})
        const errorKeys = Object.keys(errors)
        context.commit(Mutations.SET_ERROR, (errors?.[errorKeys?.[0]] ?? [])?.[0] ?? "Something Went Wrong");
    }
    else {
        context.commit(Mutations.SET_ERROR, 'An error has occured!');
    }
    return err.response
}

@Module
export default class Auth extends VuexModule {
    cards = []
    get cardsGetter() {
        return this.cards
    }
    @Mutation
    [Mutations.SET_DEFAULT_PAYMENT_STORE]() {
        this.cards = []
    }
    @Mutation
    [Mutations.SET_CARDS](payload) {
        this.cards = payload
    }
    @Action
    [Actions.SETUP_INTENT](): Promise<AxiosResponse> {
        return ApiService.get("/payment/stripe/setup-intent")
            .then(setupIntent => {
                return setupIntent.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.GET_PAYMENT_INTENT](data): Promise<AxiosResponse> {
        return ApiService.get(`/payment/stripe/payment-intent/${data}`)
            .then(paymentIntent => {
                return paymentIntent
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.CHANGE_PAYMENT_STATUS](data): Promise<AxiosResponse> {
        return ApiService.post(`/payment/stripe/update-status`, data)
            .then(status => {
                return status.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.CHANGE_ACTIVE_CARD_STATUS]({ cardId, status }): Promise<AxiosResponse> {
        return ApiService.get(`/payment/stripe/update-card-status/${cardId}/${status}`)
            .then(status => {
                return status.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.CREATE_PAYMENT](): Promise<AxiosResponse> {
        return ApiService.get(`/payment/stripe/payment-intent`)
            .then(payment => {
                return payment.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.GET_CARDS](): Promise<AxiosResponse> {
        return ApiService.get(`/payment/stripe/customer-cards`)
            .then(cards => {
                this.context.commit(Mutations.SET_CARDS, cards?.data?.data ?? [])
                return cards.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
    @Action
    [Actions.SAVE_CARD](payload): Promise<AxiosResponse> {
        return ApiService.post("/payment/stripe/save-card", payload)
            .then(() => {
                return true
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
}