<template>
  <!--begin::Menu-->
  <div
    class="
      menu
      menu-sub
      menu-sub-dropdown
      menu-column
      menu-rounded
      menu-gray-600
      menu-state-bg-light-primary
      fw-bold
      py-4
      fs-6
      w-275px
    "
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-5">
              <div
                class="image-input image-input-outline "
                data-kt-image-input="true"
                style="background-image: url(media/avatars/blank.png)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  ref="profilePictureRef"
                  class="image-input-wrapper"
                  :style="`width:60px; height:60px;background-image: url(${
                    op.get(user, 'profileImage', null) ?? 'media/avatars/150-26.jpg'
                  })`"
                ></div>

              </div>
         
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bolder d-flex align-items-center fs-5">
            {{ op.get(user, "firstName", "") }}
            {{ op.get(user, "lastName", "") }}
          </div>
          <a href="#" class="fw-bold text-break text-muted text-hover-primary fs-7">{{
            op.get(user, "email", "")
          }}</a>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5 my-1">
      <router-link to="/crafted/account/settings" class="menu-link px-5">
        Profile
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import Swal from "sweetalert2";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useStore();
    const user = computed(() => {
      return store.getters.getUser;
    });

    const op = computed(() => objectPath);

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "media/flags/france.svg",
        name: "French",
      },
    };

    const signOut = async () => {
      try {
        const response = await store.dispatch(Actions.SIGNOUT);
        if (response !== true) throw new Error();
        window.localStorage.removeItem("access_token");
        store.commit(Mutations.SET_DEFAULT_AUTH);
        router.push("/sign-in");
      } catch (err) {
        const [error] = Object.keys(store.getters.getErrors);
        Swal.fire({
          text: store.getters.getErrors[error],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    };

    const setLang = (lang) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = (lang) => {
      return i18n.locale.value === lang;
    };

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      user,
      op,
    };
  },
});
</script>
