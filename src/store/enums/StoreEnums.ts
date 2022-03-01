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
  UPDATE_PROFILE = "updateProfile",
  GET_ROLES = "getRoles",
  ATTACH_ROLE = "attachRole",
  CREATE_EXPERT_PROFILE = "createExpertProfile",
  GET_EXPERT_PROFILE = "getExpertProfile",
  UPDATE_EXPERT_PROFILE = "updateExpertProfile",
  CREATE_INVESTOR_PROFILE = "createInvestorProfile",
  GET_INVESTOR_PROFILE = "getInvestorProfile",
  UPDATE_INVESTOR_PROFILE = "updateInvestorProfile",
  GET_EXPERTISE = "getExpertise",
  GET_INDUSTRY_SECTORS = "getIndustrySectors",
  CREATE_FOUNDER_BUSINESS = "createFounderBusiness",
  GET_FOUNDER_BUSINESSES = "getFounderBusinesses",
  CREATE_FUNDING_ROUND = "createFundingRound",
  UPDATE_FOUNDER_BUSINESS = "updateFounderBusiness",
  UPDATE_FUNDING_ROUND = "updateFundingRound",
  DELETE_FUNDING_ROUND = "deleteFundingRound",
  GET_FUNDING_ROUNDS = "getFundingRounds",
  CREATE_FOUNDER = "createFounder",
  FIND_EXPERTS = "findExperts",
  FOUNDER_REQUISITE_EXPERT = "founderRequisiteExpert",
  UPLOAD_FILE = "uploadFile",
  FIND_INVESTMENT_OPPORTUNITIES = "findInvestmentOpportunities",
  INVESTMENT_OPPORTUNITY_CONNECT = "investmentOpportunityConnect",
  CONNECTED_INVESTMENT_OPPORTUNITIES = "connectedInvestmentOpportunity",
  GET_EXPERT_PROFILE_GLOBAL = "getExpertProfileGlobal",
  GET_CONFIGURATION_BY_KEY = "getConfigurationByKey",
  GET_INVESTMENT_OPPORTUNITY_PROFILE = "getInvestmentOpportunityProfile",
  CREATE_FUNDING_ROUND_INVESTMENT = "createFundingRoundInvestment",
  GET_FUNDING_ROUND_INVESTMENT = "getFundingRoundInvestment",
  UPDATE_FUNDING_ROUND_INVESTMENT = "updateFundingRoundInvestment",
  DELETE_FUNDING_ROUND_INVESTMENT = "deleteFundingRoundInvestment",
  DEACTIVATE = "deactivate",
  CREATE_BUSINESS_DRAFT = "createBusinessDraft",
  GET_BUSINESS_DRAFT = "getBusinessDraft",
  DELETE_BUSINESS_DRAFT = "deleteBusinessDraft",
  SETUP_INTENT = "setupIntent",
  SAVE_CARD = "saveCard",
  GET_PAYMENT_INTENT = "getPaymentIntent",
  CREATE_PAYMENT = "createPayment",
  GET_CARDS = "getCards",
  CHANGE_PAYMENT_STATUS = "changePaymentStatus",
  CHANGE_ACTIVE_CARD_STATUS = "changeActiveCardStatus",
  GET_PLANS = "getPlans"
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
  SET_DEFAULT_AUTH = "setDefaultAuth",
  SET_ROLES = "setRoles",
  SET_EXPERT_PROFILE = "setExpertProfile",
  SET_INVESTOR_PROFILE = "setInvestorProfile",
  SET_EXPERTISE = "setExpertise",
  SET_INDUSTRY_SECTORS = "setIndustrySectors",
  SET_TOOLBAR_BUTTON = "setToolbarButton",
  SET_FOUNDER_BUSINESSES = "setFounderBusinesses",
  SET_FOUNDER = "setFounder",
  SET_EXPERTS = "setExperts",
  SET_INVESTMENT_OPPORTUNITIES = "setInvestmentOpportunities",
  SET_BUSINESS_DRAFT = "setBusinessDraft",
  SET_CARDS = "setCards",
  SET_PLANS = "setPlans",
  SET_CONNECTED_INVESTMENT_OPPORTUNITIES = "setConnectedInvestmentOpportunities"
}

export { Actions, Mutations };
