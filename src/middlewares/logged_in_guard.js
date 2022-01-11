import store from "@/store"
import { Actions } from "../store/enums/StoreEnums"

export default async (to, from, next) => {
    if (!store.getters.getIsLoggedIn) {
        try {
            const response = await store.dispatch(Actions.AUTH_USER)
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