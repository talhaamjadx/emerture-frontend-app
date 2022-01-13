<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitResetPassword"
      id="kt_login_password_reset_form"
      :validation-schema="resetPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Reset Password</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          Enter the below fields to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <div class="fv-row mb-10">
        <label class="form-label fw-bolder text-gray-900 fs-6">Password</label>
        <Field
          class="form-control form-control-solid"
          type="password"
          placeholder=""
          name="password"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="form-label fw-bolder text-gray-900 fs-6"
          >Confirm Password</label
        >
        <Field
          class="form-control form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bolder me-4"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link
          to="/sign-up"
          class="btn btn-lg btn-light-primary fw-bolder"
          >Cancel</router-link
        >
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
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import * as Yup from "yup";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "password-reset",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const resetPassword = Yup.object().shape({
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .label("Password Confirmation"),
    });

    //Form submit function
    const onSubmitResetPassword = async (values) => {
      try {
        const response = await store.dispatch(Actions.RESET_PASSWORD, {
          ...values,
          resetToken: route.query.token,
        });
        if (response !== true) throw new Error();
        Swal.fire({
          text: `Password has been reset successfully!`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => router.push("/sign-in"));
      } catch (err) {
        store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "page-loading");
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

    return {
      onSubmitResetPassword,
      resetPassword,
      submitButton,
    };
  },
});
</script>
