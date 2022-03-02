<template>
  <!--begin::Menu wrapper-->
  <div
    id="kt_aside_menu_wrapper"
    ref="scrollElRef"
    class="hover-scroll-overlay-y my-5 my-lg-5"
    data-kt-scroll="true"
    data-kt-scroll-activate="{default: false, lg: true}"
    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-height="auto"
    data-kt-scroll-offset="0"
    data-kt-scroll-wrappers="#kt_aside_menu"
  >
    <!--begin::Menu-->
    <div
      id="#kt_header_menu"
      class="
        menu
        menu-column
        menu-title-gray-800
        menu-state-title-primary
        menu-state-icon-primary
        menu-state-bullet-primary
        menu-arrow-gray-500
      "
      data-kt-menu="true"
    >
      <template v-for="(menuItem, j) in MainMenuConfig" :key="j">
        <template v-if="menuItem.heading">
          <div class="menu-item">
            <router-link
              class="menu-link"
              active-class="active"
              :to="menuItem.route"
            >
              <span
                v-if="menuItem.svgIcon || menuItem.fontIcon"
                class="menu-icon"
              >
                <i
                  v-if="asideMenuIcons === 'font'"
                  :class="menuItem.fontIcon"
                  class="bi fs-3"
                ></i>
                <span
                  v-else-if="asideMenuIcons === 'svg'"
                  class="svg-icon svg-icon-2"
                >
                  <inline-svg :src="menuItem.svgIcon" />
                </span>
              </span>
              <span class="menu-title">{{ translate(menuItem.heading) }}</span>
            </router-link>
          </div>
        </template>
        <div
          v-if="menuItem.sectionTitle"
          :class="{ show: hasActiveChildren(menuItem.route) }"
          class="menu-item menu-accordion"
          data-kt-menu-sub="accordion"
          data-kt-menu-trigger="click"
        >
          <span class="menu-link">
            <span
              v-if="menuItem.svgIcon || menuItem.fontIcon"
              class="menu-icon"
            >
              <i
                v-if="asideMenuIcons === 'font'"
                :class="menuItem.fontIcon"
                class="bi fs-3"
              ></i>
              <span
                v-else-if="asideMenuIcons === 'svg'"
                class="svg-icon svg-icon-2"
              >
                <inline-svg :src="menuItem.svgIcon" />
              </span>
            </span>
            <span class="menu-title">{{
              translate(menuItem.sectionTitle)
            }}</span>
            <span class="menu-arrow"></span>
          </span>
          <div
            :class="{ show: hasActiveChildren(menuItem.route) }"
            class="menu-sub menu-sub-accordion"
          >
            <template v-for="(item2, k) in menuItem.sub" :key="k">
              <div v-if="item2.heading" class="menu-item">
                <router-link
                  class="menu-link"
                  active-class="active"
                  :to="item2.route"
                >
                  <span class="menu-bullet">
                    <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">{{ translate(item2.heading) }}</span>
                </router-link>
              </div>
              <div
                v-if="item2.sectionTitle"
                :class="{ show: hasActiveChildren(item2.route) }"
                class="menu-item menu-accordion"
                data-kt-menu-sub="accordion"
                data-kt-menu-trigger="click"
              >
                <span class="menu-link">
                  <span class="menu-bullet">
                    <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">{{
                    translate(item2.sectionTitle)
                  }}</span>
                  <span class="menu-arrow"></span>
                </span>
                <div
                  :class="{ show: hasActiveChildren(item2.route) }"
                  class="menu-sub menu-sub-accordion"
                >
                  <template v-for="(item3, k) in item2.sub" :key="k">
                    <div v-if="item3.heading" class="menu-item">
                      <router-link
                        class="menu-link"
                        active-class="active"
                        :to="item3.route"
                      >
                        <span class="menu-bullet">
                          <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title">{{
                          translate(item3.heading)
                        }}</span>
                      </router-link>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watchEffect } from "vue";
import { useI18n } from "vue-i18n/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { version } from "@/core/helpers/documentation";
// import { asideMenuIcons } from "@/core/helpers/config";
import objectPath from "object-path";

export default defineComponent({
  name: "kt-menu",
  components: {},
  setup() {
    const asideMenuIcons = "font";
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const MainMenu = [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "media/icons/duotune/general/gen001.svg",
        fontIcon: "bi-bar-chart",
      },
      {
        heading: "expert-profile",
        route: "/expert-profile",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "investor-profile",
        route: "/investor-profile",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-person",
      },
      {
        heading: "find-experts",
        route: "/find-experts",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-search",
      },
      {
        heading: "find-investment-opportunities",
        route: "/find-investment-opportunities",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-search",
      },
      {
        heading: "addRole",
        route: "/add-role",
        svgIcon: "media/icons/duotune/ecommerce/ecm002.svg",
        fontIcon: "bi-person-plus",
      },
      {
        heading: "businesses",
        route: "/businesses",
        svgIcon: "media/icons/duotune/ecommerce/ecm002.svg",
        fontIcon: "bi-building",
      },
      {
        heading: "connected-experts",
        route: "/connected-experts",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-person-check-fill",
      },
      {
        heading: "connected-founders",
        route: "/connected-founders",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-person-check-fill",
      },
      {
        heading: "connected-investment-opportunities",
        route: "/connected-investment-opportunities",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-diagram-3",
      },
      {
        heading: "subscription",
        route: "/subscription",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-currency-pound",
      },
    ];
    let MainMenuTemp = [...MainMenu];
    let MainMenuConfig = ref(MainMenuTemp);
    const filterItems = () => {
      MainMenuTemp = [...MainMenu];
      MainMenuTemp = MainMenuTemp.filter((config) => {
        if (
          config.heading == "expert-profile" &&
          !(user.value.expert instanceof Array) &&
          user.value.expert &&
          user.value?.userRoles?.some(
            (role) => role.name.toLowerCase() == "expert"
          )
        ) {
          return true;
        } else if (
          config.heading == "connected-experts" &&
          objectPath.get(user.value, "founderBusiness.length", false)
        ) {
          return true;
        } else if (
          config.heading == "dashboard" &&
          ((!(user.value?.investor instanceof Array) &&
            user.value.investor &&
            user.value?.userRoles?.some(
              (role) => role.name.toLowerCase() == "investor"
            )) ||
            (objectPath.get(user.value, "founderBusiness.length", false) &&
              user.value?.userRoles?.some(
                (role) => role.name.toLowerCase() == "founder"
              )) ||
            (!(user.value.expert instanceof Array) &&
              user.value.expert &&
              user.value?.userRoles?.some(
                (role) => role.name.toLowerCase() == "expert"
              )))
        ) {
          return true;
        } else if (
          (config.heading == "investor-profile" ||
            config.heading == "find-investment-opportunities" ||
            config.heading == "connected-investment-opportunities") &&
          !(user.value?.investor instanceof Array) &&
          user.value.investor &&
          user.value?.userRoles?.some(
            (role) => role.name.toLowerCase() == "investor"
          )
        ) {
          return true;
        } else if (
          config.heading == "find-experts" &&
          objectPath.get(user.value, "founderBusiness.length", false)
        ) {
          return true;
        } else if (
          config.heading == "businesses" &&
          objectPath.get(user.value, "founderBusiness.length", false)
        ) {
          return true;
        } else if (
          config.heading !== "expert-profile" &&
          config.heading !== "investor-profile" &&
          config.heading !== "founder-profile" &&
          config.heading !== "find-experts" &&
          config.heading !== "businesses" &&
          config.heading !== "find-investment-opportunities" &&
          config.heading !== "dashboard" &&
          config.heading !== "connected-experts" &&
          config.heading !== "connected-investment-opportunities"
        ) {
          return true;
        } else return false;
      });
      MainMenuConfig.value = MainMenuTemp;
    };
    watchEffect(() => {
      if (user.value) filterItems();
    });
    filterItems();
    const { t, te } = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      MainMenuConfig,
      asideMenuIcons,
      version,
      translate,
    };
  },
});
</script>
