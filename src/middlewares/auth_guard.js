import store from "@/store"
import { Actions } from "../store/enums/StoreEnums"
import objectPath from "object-path"

export default async (to, from, next) => {
    if (!store.getters.getIsLoggedIn && to.meta.loginRequired) {
        try {
            const response = await store.dispatch(Actions.AUTH_USER)
            if (response !== true) throw new Error()
            if (!objectPath.get(store, "getters.getUser.isActive", false))
                return next("/email-verification")
            else if (to.name === "email-verification") {
                return next("/")
            }
            next()
        }
        catch (err) {
            next("/sign-in")
        }
    }
    else {
        if (!objectPath.get(store, "getters.getUser.isActive", false) && to.meta.loginRequired && to.name !== "email-verification") {
            return next("/email-verification")
        }
        else if (objectPath.get(store, "getters.getUser.isActive", false) && to.meta.loginRequired && to.name == "email-verification") {
            return next("/")
        }
        next()
    }
}