import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class Miscellaneous extends VuexModule {
    alert = {
        message: "",
        subMessage: "",
        variant: "primary",
        duration: "",
        show: false,
    }
    get getAlert(){
        return this.alert
    }
    @Mutation
    setAlert(payload){
        this.alert = payload
    }
}