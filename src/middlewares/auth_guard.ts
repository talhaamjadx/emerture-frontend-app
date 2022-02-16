import store from "@/store"
import { Actions } from "../store/enums/StoreEnums"
import objectPath from "object-path"
import { NavigationGuardNext } from "vue-router"

const areRolesAdded = (user) => {
  console.log("are role added")
  return (user?.userRoles?.some(
    (role) => role.name.toLowerCase() == "expert"
  ) && user?.userRoles?.some(
    (role) => role.name.toLowerCase() == "investor"
  ) && user?.userRoles?.some(
    (role) => role.name.toLowerCase() == "founder"
  ))
}

const selectAtLeaseThreeExperts = () => {
  if (objectPath.get(store.getters.getUser, 'founderRequisiteExpert.length', 0) >= 3) {
    return true
  }
  else return false
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
      if (to.name == 'dashboard' && from.name == 'social') {
        if ((!selectAtLeaseThreeExperts() && objectPath.get(store.getters.getUser, 'founderBusiness.length', false)) && to.name !== "find-experts" && to.name !== "expert-global") {
          return next("/find-experts")
        }
        return areRolesAdded(store.getters.getUser) ? next() : next('add-role')
      }
      if ((!selectAtLeaseThreeExperts() && objectPath.get(store.getters.getUser, 'founderBusiness.length', false)) && to.name !== "find-experts" && to.name !== "expert-global") {
        return next("/find-experts")
      }
      next()
    }
    catch (err) {
      next("/sign-in")
    }
  }
  else {
    console.log("in else")
    if (!objectPath.get(store, "getters.getUser.isActive", false) && to.meta.loginRequired && to.name !== "email-verification") {
      return next("/email-verification")
    }
    else if (objectPath.get(store, "getters.getUser.isActive", false) && to.meta.loginRequired && to.name == "email-verification") {
      return areRolesAdded(store.getters.getUser) ? next('/') : next('/add-role')
    }
    if ((!selectAtLeaseThreeExperts() && objectPath.get(store.getters.getUser, 'founderBusiness.length', false)) && to.name !== "find-experts" && to.name !== "expert-global") {
      return next("/find-experts")
    }
    next()
  }
  window.scrollTo(0, 0)
}