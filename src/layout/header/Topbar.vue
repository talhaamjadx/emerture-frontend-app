<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <!--begin::Menu-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <div
                class="image-input image-input-outline "
                data-kt-image-input="true"
                style="background-image: url(media/avatars/blank.png)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  ref="profilePictureRef"
                  class="image-input-wrapper"
                  :style="`width:40px; height:40px;background-image: url(${
                    op.get(user, 'profileImage', null) ?? require('@/assets/img/blank.png')
                  })`"
                ></div>

              </div>
        <!-- <img
          :src="
            op.get(user, 'profileImage', null) ?? require('@/assets/img/blank.png')
          "
          alt="metronic"
        /> -->
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->

    <!--begin::Heaeder menu toggle-->
    <div
      class="d-flex align-items-center d-lg-none ms-2 me-n3"
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-light-primary"
        id="kt_header_menu_mobile_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Heaeder menu toggle-->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import objectPath from "object-path";
import { Actions } from "../../store/enums/StoreEnums";
import { useStore } from "vuex";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";

export default defineComponent({
  name: "topbar",
  components: {
    KTUserMenu,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const op = computed(() => objectPath);
    if (!Object.keys(store.getters.getUser).length)
      store.dispatch(Actions.AUTH_USER);
    return {
      user,
      op,
    };
  },
});
</script>
