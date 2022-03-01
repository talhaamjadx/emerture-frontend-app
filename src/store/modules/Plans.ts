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
export default class Plan extends VuexModule {
    plans = []
    get plansGetter() {
        return this.plans
    }
    @Mutation
    [Mutations.SET_PLANS](payload) {
        this.plans = payload
    }
    @Action
    [Actions.GET_PLANS](): Promise<AxiosResponse> {
        return ApiService.get(`/plans`)
            .then(plans => {
                this.context.commit(Mutations.SET_PLANS, plans?.data?.data ?? [])
                return plans.data
            })
            .catch(err => {
                errorHandler(err, this.context)
                return err.response
            })
    }
}