<template>
  <KTLoader v-if="loaderEnabled" :logo="loaderLogo"></KTLoader>

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid">
    <!-- begin:: Aside Left -->
    <KTAside
      v-if="asideEnabled"
      :lightLogo="themeLightLogo"
      :darkLogo="themeDarkLogo"
    ></KTAside>
    <!-- end:: Aside Left -->

    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
      <KTHeader :title="pageTitle"></KTHeader>

      <!-- begin:: Content -->
      <div id="kt_content" class="content d-flex flex-column flex-column-fluid">
        <!-- begin:: Content Head -->
        <!-- <KTToolbar
          v-if="subheaderDisplay"
          :breadcrumbs="breadcrumbs"
          :title="pageTitle"
        /> -->
        <!-- end:: Content Head -->

        <!-- begin:: Content Body -->
        <div class="post d-flex flex-column-fluid">
          <div
            id="kt_content_container"
            :class="{
              'container-fluid': contentWidthFluid,
              container: !contentWidthFluid,
            }"
          >
            <router-view />
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <!-- <KTFooter></KTFooter> -->
    </div>
  </div>
  <!-- end:: Body -->
  <KTScrollTop></KTScrollTop>
  <KTDrawerMessenger></KTDrawerMessenger>
  <KTUserMenu></KTUserMenu>
  <KTCreateApp></KTCreateApp>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import KTAside from "@/layout/aside/Aside.vue";
import KTHeader from "@/layout/header/Header.vue";
// import KTFooter from "@/layout/footer/Footer.vue";
import HtmlClass from "@/core/services/LayoutService";
// import KTToolbar from "@/layout/toolbar/Toolbar.vue";
import KTScrollTop from "@/layout/extras/ScrollTop.vue";
import KTUserMenu from "@/layout/header/partials/ActivityDrawer.vue";
import KTLoader from "@/components/Loader.vue";
import KTCreateApp from "@/components/modals/wizards/CreateAppModal.vue";
import KTDrawerMessenger from "@/layout/extras/DrawerMessenger.vue";
import { MenuComponent } from "@/assets/ts/components/index";
import { removeModalBackdrop } from "@/core/helpers/dom";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import {
  toolbarDisplay,
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  themeDarkLogo,
} from "@/core/helpers/config";

export default defineComponent({
  name: "Layout",
  components: {
    KTAside,
    KTHeader,
    // KTFooter,
    // KTToolbar,
    KTScrollTop,
    KTCreateApp,
    KTUserMenu,
    KTDrawerMessenger,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    HtmlClass.init();

    const pageTitle = computed(() => {
      return store.getters.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return store.getters.pageBreadcrumbPath;
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        nextTick(() => {
          reinitializeComponents();
        });
        removeModalBackdrop();
      }
    );

    return {
      toolbarDisplay,
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      pageTitle,
      breadcrumbs,
      themeLightLogo,
      themeDarkLogo,
      alert,
    };
  },
});
</script>
