<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="saveChanges1()"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="firstName"
                    class="
                      form-control form-control-lg form-control-solid
                      mb-3 mb-lg-0
                    "
                    placeholder="First name"
                    v-model="profileDetails.firstName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-6 fv-row">
                  <Field
                    type="text"
                    name="lastName"
                    class="form-control form-control-lg form-control-solid"
                    placeholder="Last name"
                    v-model="profileDetails.lastName"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-bold fs-6"
              >Job Title</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="jobTitle"
                class="form-control form-control-lg form-control-solid"
                placeholder="Job Ttilte"
                v-model="profileDetails.jobTitle"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="jobTitle" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6"
              >Introduction</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="introduction"
                class="form-control form-control-lg form-control-solid"
                placeholder="Introduction"
                v-model="profileDetails.introduction"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="introduction" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">
              <span class="required">Contact Phone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                @input="formatTelephone($event);"
                @keypress="limitInput($event)"
                type="tel"
                name="telephone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
                v-model="profileDetails.telephone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="telephone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-bold fs-6">LinkedIn</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="linkedInProfileUrl"
                class="form-control form-control-lg form-control-solid"
                placeholder="LinkedIn"
                v-model="profileDetails.linkedInProfileUrl"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="linkedInProfileUrl" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-white btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            :data-kt-indicator="loading ? 'on' : null"
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span v-if="!loading" class="indicator-label"> Save Changes </span>
            <span v-if="loading" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </Form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-boldest m-0">Change Password</h3>
      </div>
    </div>
    <!--end::Card header-->
    <Form
      class="form"
      novalidate="novalidate"
      @submit="changePasswordSubmit"
      :validation-schema="changePassword"
    >
      <!--begin::Content-->
      <div id="kt_account_signin_method" class="collapse show">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Email Address-->
          <div class="mb-8">
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-bold fs-6"
                >Old Password</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-4 fv-row">
                <Field
                  ref="oldPasswordRef"
                  type="password"
                  name="oldPassword"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Old Password"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="oldPassword" />
                  </div>
                </div>
              </div>
              <div class="col-lg-4"></div>
              <!--end::Col-->
            </div>
          </div>
          <!--end::Email Address-->
          <div class="mb-8">
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-bold fs-6"
                >New Password</label
              >
              <!--end::Label-->
              <div class="col-lg-4 fv-row">
                <Field
                  ref="newPasswordRef"
                  type="password"
                  name="password"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="New Password"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password" />
                  </div>
                </div>
              </div>
              <div class="col-lg-4"></div>
              <!--end::Col-->
            </div>
          </div>
          <div class="mb-8">
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-bold fs-6"
                >Confirm New Password</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-4 fv-row">
                <Field
                  ref="passwordConfirmationRef"
                  type="password"
                  name="password_confirmation"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Confirm New Password"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="password_confirmation" />
                  </div>
                </div>
              </div>
              <div class="col-lg-4"></div>
              <!--end::Col-->
            </div>
          </div>
          <!--begin::Password-->
          <!--end::Password-->
          <button
            :data-kt-indicator="loading2 ? 'on' : null"
            type="submit"
            class="btn btn-primary"
          >
            <span v-if="!loading2" class="indicator-label"> Save Changes </span>
            <span v-if="loading2" class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card body-->
      </div>
    </Form>
    <!--end::Content-->
  </div>

  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_deactivate"
      aria-expanded="true"
      aria-controls="kt_account_deactivate"
    >
      <div class="card-title m-0">
        <h3 class="fw-boldest m-0">Deactivate Account</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_deactivate" class="collapse show">
      <!--begin::Form-->
      <form id="kt_account_deactivate_form" class="form" @submit.prevent="">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <div
            class="
              notice
              d-flex
              bg-light-warning
              rounded
              border-warning border border-dashed
              mb-9
              p-6
            "
          >
            <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
              <inline-svg src="media/icons/duotune/general/gen044.svg" />
            </span>
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-grow-1">
              <!--begin::Content-->
              <div class="fw-bold">
                <h4 class="text-gray-800 fw-bolder">
                  You Are Deactivating Your Account
                </h4>

                <div class="fs-6 text-gray-600">
                  For extra security, this requires you to confirm your email or
                  phone number when you reset yousignr password. <br /><a
                    class="fw-bolder"
                    href="#"
                    >Learn more</a
                  >
                </div>
              </div>
              <!--end::Content-->
            </div>
            <!--end::Wrapper-->
          </div>

          <!--begin::Form input row-->
          <div class="form-check form-check-solid fv-row">
            <input
              name="deactivate"
              class="form-check-input"
              type="checkbox"
              value=""
              id="deactivate"
            />
            <label class="form-check-label fw-bold ps-2 fs-6" for="deactivate"
              >Confirm Account Deactivation</label
            >
          </div>
          <!--end::Form input row-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            id="kt_account_deactivate_account_submit"
            ref="submitButton5"
            type="submit"
            class="btn btn-danger fw-bold"
          >
            <span
              data-bs-toggle="modal"
              :data-bs-target="`#kt_modal_deactivate`"
              class="indicator-label"
            >
              Deactivate Account
            </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Card footer-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <DeactivateAccountModal />
</template>

<script lang="ts">
import { useStore } from "vuex";
import { Actions } from "../../../store/enums/StoreEnums";
import { defineComponent, onMounted, ref, computed, Ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import * as Yup from "yup";
import DeactivateAccountModal from "@/views/crafted/modals/forms/DeactivateAccountModal.vue";

interface ProfileDetails {
  firstName: string;
  lastName: string;
  telephone: string;
  introduction: string;
  jobTitle: string;
  linkedInProfileUrl: string;
  profileImage: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    Form,
    DeactivateAccountModal,
  },
  setup() {
    const loading = ref<boolean>(false);
    const loading2 = ref<boolean>(false);
    const tempImage = ref<string>("");
    const newImageAdded = ref<boolean>(false);
    const store = useStore();
    const user = computed(() => {
      return store.getters.getUser;
    });
    let file: File;
    const oldPasswordRef: Ref = ref(null);
    const newPasswordRef: Ref = ref(null);
    const passwordConfirmationRef: Ref = ref(null);
    const profilePictureRef: Ref = ref(null);
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      firstName: Yup.string().required().label("First name"),
      lastName: Yup.string().required().label("Last name"),
      telephone: Yup.string().required().label("Contact phone"),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      oldPassword: Yup.string().required().label("Old password"),
      password: Yup.string().min(8).required().label("Password"),
      password_confirmation: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });
    const limitInput = (event) => {
      if (event.target.value.length > 11) event.preventDefault();
      if (event.charCode < 48 || event.charCode > 57) {
        event.preventDefault();
      }
    };
const formatTelephone = (e) => {
      if (e.target.value.charCodeAt(0) != 48 && e.target.value) {
        profileDetails.value.telephone = "0" + profileDetails.value.telephone;
      }
      if (e.target.value.length == 6) {
        profileDetails.value.telephone =
          (profileDetails.value.telephone as string).substr(0, 5) +
          " " +
          (profileDetails.value.telephone as string).substr(5);
      }
    };
    const profileDetails = ref<ProfileDetails>({
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      linkedInProfileUrl: user.value.linkedInProfileUrl,
      jobTitle: user.value.jobTitle,
      telephone: user.value.telephone,
      introduction: user.value.introduction,
      profileImage: user.value.profileImage,
    });
    const handleImageUpload = (event) => {
      file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        tempImage.value = reader.result as string;
        newImageAdded.value = true;
      };
    };
    const saveChanges1 = async () => {
      loading.value = true;
      try {
        let fd = new FormData();
        if (file) fd.append("profileImage", file, file.name);
        fd.append("firstName", profileDetails.value.firstName);
        fd.append("lastName", profileDetails.value.lastName);
        fd.append(
          "linkedInProfileUrl",
          profileDetails.value.linkedInProfileUrl
        );
        fd.append("jobTitle", profileDetails.value.jobTitle);
        fd.append("telephone", profileDetails.value.telephone);
        fd.append("introduction", profileDetails.value.introduction);
        const response = await store.dispatch(Actions.UPDATE_PROFILE, fd);
        if (response !== true) throw new Error();
        store.dispatch(Actions.AUTH_USER);
        loading.value = false;
        store.commit("setAlert", {
          message: "Profile Updated",
          subMessage: "Profile has been updated successfully",
          variant: "primary",
          duration: 4000,
          show: true,
        });
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
    };
    const changePasswordSubmit = async (values) => {
      loading2.value = true;
      try {
        const response = await store.dispatch(Actions.CHANGE_PASSWORD, values);
        if (response !== true) throw new Error();
        oldPasswordRef.value.reset();
        newPasswordRef.value.reset();
        passwordConfirmationRef.value.reset();
        loading2.value = false;
        store.commit("setAlert", {
          message: "Password Updated",
          subMessage: "Password has been updated successfully",
          variant: "primary",
          duration: 4000,
          show: true,
        });
      } catch (err) {
        loading2.value = false;
        const error = store.getters.getErrors
        store.commit("setAlert", {
          message: error,
          subMessage: "",
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };

    const saveChanges2 = () => {
      if (submitButton2.value) {
        // Activate indicator
        submitButton2.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton2.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges3 = () => {
      if (submitButton3.value) {
        // Activate indicator
        submitButton3.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton3.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges4 = () => {
      if (submitButton4.value) {
        // Activate indicator
        submitButton4.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton4.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");

          store.commit("setAlert", {
            message: "Sucess",
            subMessage: "Password is successfully changed!",
            variant: "primary",
            duration: 4000,
            show: true,
          });
          passwordFormDisplay.value = false;
        }, 2000);
      }
    };

    const removeImage = () => {
      // profileDetails.value.avatar = "media/avatars/blank.png";
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Settings", ["Account"]);
    });

    return {
      formatTelephone,
      limitInput,
      loading,
      loading2,
      profilePictureRef,
      tempImage,
      newImageAdded,
      passwordConfirmationRef,
      oldPasswordRef,
      newPasswordRef,
      changePasswordSubmit,
      user,
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      saveChanges2,
      saveChanges3,
      saveChanges4,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
      handleImageUpload,
    };
  },
});
</script>
