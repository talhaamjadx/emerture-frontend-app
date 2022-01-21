import store from "@/store"
import { Actions } from "../store/enums/StoreEnums"
import objectPath from "object-path"
import { NavigationGuardNext } from "vue-router"

const areRolesAdded = (user) => {
    return (user?.userRoles?.some(
        (role) => role.name.toLowerCase() == "expert"
      ) && user?.userRoles?.some(
        (role) => role.name.toLowerCase() == "investor"
      ) && user?.userRoles?.some(
        (role) => role.name.toLowerCase() == "founder"
      ))
}

export default async (to, from, next): Promise<NavigationGuardNext | undefined> => {
    if (!store.getters.getIsLoggedIn && to.meta.loginRequired) {
        try {
            const response: (Record<string, unknown> | boolean) = await store.dispatch(Actions.AUTH_USER)
            if (response !== true) throw new Error()
            if (!objectPath.get(store, "getters.getUser.isActive", false))
                return next("/email-verification")
            else if (to.name === "email-verification") {
                return areRolesAdded(store.getters.getUser) ? next('/') : next('/add-role')
            }
            if(to.name == 'dashboard' && from.name == 'social'){
                return areRolesAdded(store.getters.getUser) ? next() : next('add-role')
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
            return areRolesAdded(store.getters.getUser) ? next('/') : next('/add-role')
        }
        next()
    }
    window.scrollTo(0, 0)
}