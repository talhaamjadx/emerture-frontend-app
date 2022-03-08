<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <KTLoader v-if="loaderEnabled" :logo="loaderLogo"></KTLoader>

    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign In to Emerture</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          New Here?

          <router-link to="/sign-up" class="link-primary fw-bolder">
            Create an Account
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0"
            >Password</label
          >
          <!--end::Label-->

          <!--begin::Link-->
          <router-link
            to="/forgot-password"
            class="link-primary fs-6 fw-bolder"
          >
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          :data-kt-indicator="loading ? 'on' : null"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span v-if="!loading" class="indicator-label"> Continue </span>

          <span v-if="loading" class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <div class="text-center text-muted text-uppercase fw-bolder mb-5">
          or
        </div>
        <!--end::Separator-->

        <!--begin::Google link-->
        <a
          href="javascript:void(0)"
          @click="googleLogin"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="media/svg/brand-logos/google-icon.svg"
            class="h-20px me-3"
          />
          Continue with Google
        </a>
        <a
          href="javascript:void(0)"
          @click="linkedInLogin"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="media/svg/brand-logos/linkedin.svg"
            class="h-20px me-3"
          />
          Continue with LinkedIn
        </a>
        <!--end::Google link-->

        <!--begin::Google link-->
        <!-- <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="media/svg/brand-logos/facebook-4.svg"
            class="h-20px me-3"
          />
          Continue with Facebook
        </a> -->
        <!--end::Google link-->

        <!--begin::Google link-->
        <!-- <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100">
          <img
            alt="Logo"
            src="media/svg/brand-logos/apple-black.svg"
            class="h-20px me-3"
          />
          Continue with Apple
        </a> -->
        <!--end::Google link-->
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import KTLoader from "@/components/Loader.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import { loaderEnabled, loaderLogo } from "@/core/helpers/config";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
    KTLoader,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loading = ref<boolean>(false);

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    const googleLogin = () => {
      location.replace(
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GOOGLE_LOGIN_URL
      );
    };
    const linkedInLogin = () => {
      location.replace(
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LINKEDIN_LOGIN_URL
      );
    };
    const areRolesAdded = (user) => {
      return (
        user.userRoles?.some((role) => role.name.toLowerCase() == "expert") &&
        user?.userRoles?.some(
          (role) => role.name.toLowerCase() == "investor"
        ) &&
        user?.userRoles?.some((role) => role.name.toLowerCase() == "founder")
      );
    };
    const onSubmitLogin = (values) => {
      loading.value = true;
      store.dispatch(Actions.LOGOUT);
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }
      store
        .dispatch(Actions.SIGNIN, values)
        .then(async (res) => {
          if (res !== true) throw new Error();
          loading.value = false;
          store.commit("setAlert", {
            message: "Logged In",
            subMessage: "You have logged in successfully!",
            variant: "primary",
            duration: 4000,
            show: true,
          });
          try {
            const response = await store.dispatch(Actions.AUTH_USER);
            if (response !== true) throw new Error();
            loading.value = false;
            areRolesAdded(store.getters.getUser)
              ? router.push({ name: "dashboard" })
              : router.push("/add-role");
          } catch (err) {
            loading.value = false;
            const error = store.getters.getErrors;
            store.commit("setAlert", {
              message: "Error",
              subMessage: error,
              variant: "danger",
              duration: 4000,
              show: true,
            });
          }
        })
        .catch(() => {
          loading.value = false;
          const error = store.getters.getErrors;
          store.commit("setAlert", {
            message: "Error",
            subMessage: error,
            variant: "danger",
            duration: 4000,
            show: true,
          });
        });

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      loading,
      linkedInLogin,
      googleLogin,
      onSubmitLogin,
      login,
      submitButton,
      loaderEnabled,
      loaderLogo,
    };
  },
});
</script>
