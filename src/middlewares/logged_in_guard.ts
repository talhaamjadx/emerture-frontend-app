import store from "@/store"
import { Actions } from "../store/enums/StoreEnums"
import { NavigationGuardNext } from "vue-router"

export default async (to, from, next): Promise<NavigationGuardNext | undefined> => {
    if (to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'password-reset')
        return next()
    if (!store.getters.getIsLoggedIn) {
        try {
            const response: (Record<string, unknown> | boolean) = await store.dispatch(Actions.AUTH_USER)
            if (response == true) throw new Error()
            next()
        }
        catch (err) {
            next("/")
        }
    }
    else
        next("/")
}