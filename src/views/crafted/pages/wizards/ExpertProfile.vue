<template>
  <!--begin::Stepper-->
  <div
    class="
      stepper stepper-pills stepper-column
      d-flex
      flex-column flex-xl-row flex-row-fluid
    "
    id="kt_create_account_stepper"
    ref="verticalWizardRef"
  >
    <!--begin::Aside-->
    <div
      class="
        d-flex
        justify-content-center
        bg-white
        rounded
        justify-content-xl-start
        flex-row-auto
        w-100 w-xl-300px w-xxl-400px
        me-9
      "
    >
      <!--begin::Wrapper-->
      <div class="px-6 px-lg-10 px-xxl-15 py-20">
        <!--begin::Nav-->
        <div class="stepper-nav">
          <!--begin::Step 1-->
          <div class="stepper-item current" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">1</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Personal Details</h3>

              <!-- <div class="stepper-desc fw-bold">Setup Your Account Details</div> -->
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 1-->

          <!--begin::Step 2-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">2</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Professional Summary</h3>
              <!-- <div class="stepper-desc fw-bold">
                Setup Your Account Settings
              </div> -->
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 2-->

          <!--begin::Step 3-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">3</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Showcase your expertise</h3>
              <!-- <div class="stepper-desc fw-bold">Your Business Related Info</div> -->
            </div>
            <!--end::Label-->
          </div>
          <!--end::Step 3-->

          <!--begin::Step 4-->
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">4</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Key Skills</h3>
            </div>
            <!--end::Label-->
          </div>
        </div>
        <!--end::Nav-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--begin::Aside-->

    <!--begin::Content-->
    <div class="d-flex flex-row-fluid flex-center bg-white rounded">
      <!--begin::Form-->
      <form
        class="py-20 w-100 w-xl-700px px-9"
        novalidate="novalidate"
        id="kt_create_account_form"
        @submit="handleStep"
      >
        <!--begin::Step 1-->
        <div class="current" data-kt-stepper-element="content">
          <PersonalDetails
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></PersonalDetails>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <ProfessionalSummary
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></ProfessionalSummary>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <ShowcaseYourExpertise
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
            :isDocumentAddedProp="isDocumentAdded"
          ></ShowcaseYourExpertise>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <div data-kt-stepper-element="content">
          <KeySkills
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></KeySkills>
        </div>
        <!--end::Step 4-->
        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-10">
          <!--begin::Wrapper-->
          <div class="mr-2">
            <button
              type="button"
              class="btn btn-lg btn-light-primary me-3"
              data-kt-stepper-action="previous"
              @click="previousStep"
            >
              <span class="svg-icon svg-icon-4 me-1">
                <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
              </span>
              Back
            </button>
          </div>
          <!--end::Wrapper-->

          <!--begin::Wrapper-->
          <div>
            <button
              :data-kt-indicator="loading ? 'on' : null"
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span v-if="!loading" class="indicator-label">
                {{ doesExpertProfileExist ? "Update" : "Submit" }}
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <button v-else type="submit" class="btn btn-lg btn-primary">
              Continue
              <span class="svg-icon svg-icon-4 ms-1 me-0">
                <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
              </span>
            </button>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Actions-->
      </form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Stepper-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, provide } from "vue";
import PersonalDetails from "@/components/wizard/steps/PersonalDetails.vue";
import ProfessionalSummary from "@/components/wizard/steps/ProfessionalSummary.vue";
import ShowcaseYourExpertise from "@/components/wizard/steps/ShowcaseYourExpertise.vue";
import KeySkills from "@/components/wizard/steps/KeySkills.vue";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import { StepperComponent } from "@/assets/ts/components";

interface IStep1 {
  name: string;
  jobTitle: string;
  telephone: string;
  linkedInProfileUrl: string;
}

interface IStep2 {
  introduction: string;
  bio: string;
}

interface IStep3 {
  linkToExternalDocuments: string;
  documents: unknown;
}

interface IStep4 {
  expertIndustrySectors: Array<number | string>;
  expertExpertise: Array<number | string>;
}

interface CreateAccount extends IStep1, IStep2, IStep3, IStep4 {}

export default defineComponent({
  name: "expert-profile",
  components: {
    PersonalDetails,
    ProfessionalSummary,
    ShowcaseYourExpertise,
    KeySkills,
  },
  setup() {
    const loading = ref<boolean>(false);
    const store = useStore();
    let roleId = 0;
    const isDocumentAdded = ref<boolean>(true);
    const formDataTemp = ref<FormData>(new FormData());
    const _stepperObj = ref<StepperComponent | null>(null);
    const verticalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const user = computed(() => store.getters.getUser);
    const expertProfile = computed(() => store.getters.expertProfileGetter);
    const roles = computed(() => {
      return store.getters.getRolesData;
    });
    const doesExpertProfileExist = computed(() => {
      if (expertProfile.value) return true;
      else return false;
    });
    watch(user, () => {
      if (!Object.keys(user).length) {
        getExpertProfile();
      }
    });
    const getExpertProfile = async () => {
      if (!expertProfile.value)
        try {
          await store.dispatch(Actions.GET_EXPERT_PROFILE, {
            id: user.value.id,
          });
        } catch (err) {
          console.log(err);
        }
    };
    getExpertProfile();
    provide("expertProfile", expertProfile);
    const formData = ref<CreateAccount>({
      name: "",
      jobTitle: "",
      telephone: "",
      linkedInProfileUrl: "",
      introduction: "",
      bio: "",
      linkToExternalDocuments: "",
      documents: null,
      expertIndustrySectors: [],
      expertExpertise: [],
    });

    onMounted(async () => {
      try {
        if (!roles.value.length) {
          const response = await store.dispatch(Actions.GET_ROLES);
          if (response !== true) throw new Error();
          roleId = objectPath.get(
            roles.value.find((role) => role.name.toLowerCase() === "expert"),
            "id",
            0
          );
        } else
          roleId = objectPath.get(
            roles.value.find((role) => role.name.toLowerCase() === "expert"),
            "id",
            0
          );
      } catch (err) {
        console.log("error in fetching roles");
      }
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );

      setCurrentPageBreadcrumbs("Expert Profile", []);
    });
    const createAccountSchema = [
      Yup.object({
        name: Yup.string().required().label("Name"),
        jobTitle: Yup.string().required().label("Job Title"),
        linkedInProfileUrl: Yup.string()
          .required()
          .label("LinkedIn Profile URL"),
      }),
      Yup.object({
        introduction: Yup.string().required().label("Introduction"),
        bio: Yup.string().required().label("Bio"),
      }),
      {},
      {},
    ];

    const currentSchema = computed(() => {
      return createAccountSchema[currentStepIndex.value];
    });

    const { resetForm, handleSubmit } = useForm<
      IStep1 | IStep2 | IStep3 | IStep4
    >({
      validationSchema: currentSchema,
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    resetForm({
      values: {
        ...formData.value,
      },
    });

    const handleStep = handleSubmit((values) => {
      if (!formDataTemp.value.get("documents") && currentStepIndex.value == 2) {
        if (!expertProfile?.value?.document) {
          isDocumentAdded.value = false;
          return;
        }
      }
      formData.value = {
        ...formData.value,
        ...values,
      };

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;

      _stepperObj.value.goPrev();
    };

    const formSubmit = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          doesExpertProfileExist.value
            ? Actions.UPDATE_EXPERT_PROFILE
            : Actions.CREATE_EXPERT_PROFILE,
          doesExpertProfileExist.value
            ? { id: expertProfile.value.id, data: formDataTemp.value }
            : formDataTemp.value
        );
        if (response !== true) throw new Error();
        try {
          const response = await store.dispatch(Actions.ATTACH_ROLE, {
            id: roleId,
          });
          if (response !== true) throw new Error();
          await store.dispatch(Actions.AUTH_USER);
          loading.value = false;
          store.commit("setAlert", {
            message: "Success",
            subMessage: "Role is pending for approval",
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
        loading.value = false;
        store.commit("setAlert", {
          message: "Success",
          subMessage: `Expert Profile ${
            doesExpertProfileExist.value ? "Updated" : "Created"
          }`,
          variant: "primary",
          duration: 4000,
          show: true,
        });
      } catch (err) {
        loading.value = false;
        store.commit("setAlert", {
          message: "Error",
          subMessage: `Expert Profile ${
            doesExpertProfileExist.value ? "Updation" : "Creation"
          } Unsuccessful`,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };

    return {
      loading,
      isDocumentAdded,
      doesExpertProfileExist,
      formDataTemp,
      verticalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
    };
  },
});
</script>
