enum Actions {
  // action types
  ADD_BODY_CLASSNAME = "addBodyClassName",
  REMOVE_BODY_CLASSNAME = "removeBodyClassName",
  ADD_BODY_ATTRIBUTE = "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE = "removeBodyAttribute",
  ADD_CLASSNAME = "addClassName",
  VERIFY_AUTH = "verifyAuth",
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  UPDATE_USER = "updateUser",
  FORGOT_PASSWORD_OLD = "forgotPasswordOld",
  SET_BREADCRUMB_ACTION = "setBreadcrumbAction",
  SIGNUP = "signup",
  SIGNIN = "signin",
  AUTH_USER = "getAuthUser",
  VERIFY_CODE = "verifyCode",
  RESEND_VERIFY_CODE = "resendVerifyCode",
  SIGNOUT = "signout",
  FORGOT_PASSWORD = "forgotPassword",
  RESET_PASSWORD = "resetPassword",
  CHANGE_PASSWORD = "changePassword",
}

enum Mutations {
  // mutation types
  SET_CLASSNAME_BY_POSITION = "appendBreadcrumb",
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",
  SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",
  IS_LOGGED_IN = "setIsLoggedIn",
  SET_AUTH_USER = "setAuthUser",
  SET_DEFAULT_AUTH = "setDefaultAuth"
}

export { Actions, Mutations };
