import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthGuard from "@/middlewares/auth_guard"
import LoggedInGuard from "@/middlewares/logged_in_guard"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
            meta: {
              loginRequired: true
            }
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/expert-profile",
        name: "expert-profile",
        component: () => import("@/views/crafted/pages/wizards/ExpertProfile.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/business/:id",
        name: "business",
        component: () => import("@/views/crafted/pages/BusinessDetails.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/investor-profile",
        name: "investor-profile",
        component: () => import("@/views/crafted/pages/wizards/InvestorProfile.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/create-business",
        name: "create-business",
        component: () => import("@/views/crafted/pages/wizards/BusinessCreate.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/create-funding-round",
        name: "create-funding-round",
        component: () => import("@/views/crafted/pages/wizards/CreateFundingRound.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/social",
        name: "social",
        component: () => import("@/views/crafted/authentication/basic-flow/social.vue"),
      },
      {
        path: "/add-role",
        name: "add-role",
        component: () => import("@/views/crafted/pages/pricing/add-role.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/businesses",
        name: "businesses",
        component: () => import("@/views/crafted/pages/businesses.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/create-investment-oppertunity",
        name: "create-investment-oppertunity",
        component: () => import("@/views/crafted/pages/wizards/CreateInvestmentOppertunity.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/update-investment-oppertunity/:id",
        name: "update-investment-oppertunity",
        component: () => import("@/views/crafted/pages/wizards/UpdateInvestmentOppertunity.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/crafted/pages/pricing/pricing-2",
        name: "pricing-2",
        component: () => import("@/views/crafted/pages/pricing/pricing-2.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/crafted/pages/about-us",
        name: "about-us",
        component: () => import("@/views/crafted/pages/about-us.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/crafted/pages/contact-us",
        name: "contact-us",
        component: () => import("@/views/crafted/pages/contact-us.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/email-verification",
        name: "email-verification",
        component: () => import("@/views/crafted/authentication/basic-flow/email-verification.vue"),
        meta: {
          loginRequired: true
        },
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        meta: {
          loginRequired: true
        },
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () => import("@/views/apps/customers/CustomersListing.vue"),
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
      },
      {
        path: "/subscriptions/getting-started",
        name: "subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
      },
      {
        path: "/subscriptions/subscription-list",
        name: "subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
      },
      {
        path: "/subscriptions/add-subscription",
        name: "subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
      },
      {
        path: "/subscriptions/view-subscription",
        name: "subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
        meta: {
          loginRequired: true
        }
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        beforeEnter: LoggedInGuard
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        beforeEnter: LoggedInGuard
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/ForgotPassword.vue"),
        beforeEnter: LoggedInGuard
      },
      {
        path: "/reset-password",
        name: "reset-password",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/ResetPassword.vue"),
        beforeEnter: LoggedInGuard
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/verify-email-1",
    name: "verify-email-1",
    component: () => import("@/views/crafted/authentication/verify-email-1.vue"),
  },
  {
    path: "/verify-email-2",
    name: "verify-email-2",
    component: () => import("@/views/crafted/authentication/verify-email-2.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(AuthGuard);

export default router;
