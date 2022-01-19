import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import Auth from "@/store/modules/Auth";
import Role from "@/store/modules/Role";
import Expert from "@/store/modules/Expert";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";

config.rawError = true;

const store = createStore({
  modules: {
    Role,
    Auth,
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    Expert
  },
});

export default store;
