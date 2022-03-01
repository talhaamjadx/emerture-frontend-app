import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import Auth from "@/store/modules/Auth";
import Investor from "@/store/modules/Investor";
import Configuration from "@/store/modules/Configuration";
import Role from "@/store/modules/Role";
import Expert from "@/store/modules/Expert";
import Business from "@/store/modules/Business";
import Founder from "@/store/modules/Founder";
import Payment from "@/store/modules/Payment";
import Plans from "@/store/modules/Plans";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import Miscellaneous from "@/store/modules/Miscellaneous"

config.rawError = true;

const store = createStore({
  state:{
    errors: []
  },
  mutations:{
    setError(state, payload){
      state.errors = payload
    }
  },
  getters:{
    getErrors(state){
      return state.errors
    }
  },
  modules: {
    Role,
    Auth,
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    Expert,
    Investor,
    Business,
    Founder,
    Configuration,
    Miscellaneous,
    Payment,
    Plans
  },
});

export default store;
