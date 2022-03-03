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
              <h3 class="stepper-title">Images</h3>

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
              <h3 class="stepper-title">Upload Pitch Deck</h3>
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
              <h3 class="stepper-title">Business Description</h3>
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
              <h3 class="stepper-title">Business Details</h3>
            </div>
            <!--end::Label-->
          </div>
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">5</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Advance Assurance</h3>
            </div>
            <!--end::Label-->
          </div>
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">6</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Team Members</h3>
            </div>
            <!--end::Label-->
          </div>
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">7</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Industry Sectors</h3>
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
          <ImagesUpdate
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></ImagesUpdate>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <UploadPitchDeckUpdate
            @file-size-error="fileSizeError = $event"
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></UploadPitchDeckUpdate>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <BusinessDescriptionUpdate
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></BusinessDescriptionUpdate>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <div data-kt-stepper-element="content">
          <BusinessDetailsUpdate
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></BusinessDetailsUpdate>
        </div>
        <div data-kt-stepper-element="content">
          <AdvancedAssuranceUpdate
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></AdvancedAssuranceUpdate>
        </div>
        <div data-kt-stepper-element="content">
          <TeamMembersUpdate
            @resetTouch="touched = $event"
            :touchedParent="touched"
            @teamMembersLength="teamMembersLength = $event"
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></TeamMembersUpdate>
        </div>
        <div data-kt-stepper-element="content">
          <IndustrySectorsBusinessesUpdate
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></IndustrySectorsBusinessesUpdate>
        </div>
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
                Submit
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

            <button
              @click="handleTouch"
              v-else
              type="submit"
              class="btn btn-lg btn-primary"
            >
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
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  provide,
  watchEffect,
} from "vue";
import ImagesUpdate from "@/components/wizard/steps/ImagesUpdate.vue";
import UploadPitchDeckUpdate from "@/components/wizard/steps/UploadPitchDeckUpdate.vue";
import BusinessDescriptionUpdate from "@/components/wizard/steps/BusinessDescriptionUpdate.vue";
import BusinessDetailsUpdate from "@/components/wizard/steps/BusinessDetailsUpdate.vue";
import AdvancedAssuranceUpdate from "@/components/wizard/steps/AdvancedAssuranceUpdate.vue";
import IndustrySectorsBusinessesUpdate from "@/components/wizard/steps/IndustrySectorsBusinessesUpdate.vue";
import TeamMembersUpdate from "@/components/wizard/steps/TeamMembersUpdate.vue";
import { StepperComponent } from "@/assets/ts/components";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";

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
  name: "update-investment-opportunity",
  components: {
    ImagesUpdate,
    UploadPitchDeckUpdate,
    BusinessDescriptionUpdate,
    BusinessDetailsUpdate,
    AdvancedAssuranceUpdate,
    TeamMembersUpdate,
    IndustrySectorsBusinessesUpdate,
  },
  setup() {
    const loading = ref<boolean>(false);
    const fileSizeError = ref<boolean>(false);
    const touched = ref<boolean>(false);
    const teamMembersLength = ref<number>(0);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const businesses = computed(() => store.getters.getBusinesses);
    const business = ref<Record<string, unknown>>({});
    const formDataTemp = ref<FormData>(new FormData());
    const _stepperObj = ref<StepperComponent | null>(null);
    const verticalWizardRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
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
    provide("business", business);
    const syncData = () => {
      for (const key in business.value) {
        if (key == "industrySectors" && business.value[key]) {
          formDataTemp.value.append(
            key,
            JSON.stringify(
              (business.value[key] as Array<Record<string, unknown>>).map(
                (sector) => sector.id
              )
            )
          );
        } else formDataTemp.value.append(key, business.value[key] as string);
      }
    };
    const handleTouch = () => {
      if (_stepperObj.value?.currentStepIndex == 6) touched.value = true;
    };
    onMounted(async () => {
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );
      if (!businesses.value?.founderBusinesses?.length) {
        try {
          const response = await store.dispatch(
            Actions.GET_FOUNDER_BUSINESSES,
            {
              page: 1,
              perPage: 10,
            }
          );
          if (response !== true) throw new Error();
          business.value = businesses.value?.founderBusinesses.find(
            (b) => b.id == route.params.id
          );
          syncData();
        } catch (err) {
          console.log(err);
        }
      } else {
        business.value = businesses.value?.founderBusinesses.find(
          (b) => b.id == route.params.id
        );
        syncData();
      }
      setCurrentPageBreadcrumbs("Update Investment Opportunity", [
        "Businesses",
      ]);
    });
    const createAccountSchema = computed(() => {
      let tempObj = {};
      for (let i = 0; i < +teamMembersLength.value; i++) {
        tempObj[`team-member-name-${i}`] = Yup.string()
          .required()
          .label("Name");
        tempObj[`team-member-linkedInProfileUrl-${i}`] = Yup.string()
          .required()
          .label("LinkedIn Profile");
        tempObj[`team-member-jobTitle-${i}`] = Yup.string()
          .required()
          .label("Job Title");
        tempObj[`team-member-introduction-${i}`] = Yup.string()
          .required()
          .label("Introduction");
      }
      return [
        {},
        Yup.object({
          pitchDeckDocument: Yup.mixed()
            .required()
            .label("Pitch Deck Document"),
        }),
        Yup.object({
          name: Yup.string().required().label("Name"),
          summary: Yup.string().required().label("Summary"),
          overview: Yup.string().required().label("Overview"),
          defensibleUsp: Yup.string().required().label("Defensible USP"),
        }),
        Yup.object({
          telephone: Yup.string()
            .required()
            .min(12, "Telephone must be 11 characters long.")
            .label("Telephone"),
          website: Yup.string()
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              "Enter correct url!"
            )
            .required()
            .label("Website"),
          currencyCode: Yup.string().required().label("Currency"),
          geoFocusCountryCode: Yup.string().required().label("Geo Focus"),
        }),
        {},
        tempObj,
        {},
        Yup.object({
          fundingRoundName: Yup.string().required().label("Name"),
          fundingRoundInvestmentRequired: Yup.string()
            .required()
            .label("Investment Required"),
          fundingRoundPreMoneyValuation: Yup.string()
            .required()
            .label("Pre-Money Valuation"),
          fundingRoundMinimumInvestment: Yup.string()
            .required()
            .label("Minimum Investment"),
        }),
      ];
    });

    const currentSchema = ref<Record<string, unknown>>({});
    watchEffect(() => {
      currentSchema.value = createAccountSchema.value[currentStepIndex.value];
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
      if (fileSizeError.value) return;
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
      loading.value = true
      try {
        const response = await store.dispatch(Actions.UPDATE_FOUNDER_BUSINESS, {
          id: route.params.id,
          payload: formDataTemp.value,
        });
        if (response !== true) throw new Error();
        loading.value = false
        store.commit("setAlert", {
          message: "Success",
          subMessage: `Investment Opportunity ${"Updated"}`,
          variant: "primary",
          duration: 4000,
          show: true,
        });
        setTimeout(() => {
          router.push("/businesses");
        }, 2000);
      } catch (err) {
        loading.value = false
        store.commit("setAlert", {
          message: "Error",
          subMessage: "`Investment Opportunity Updation Unsuccessful`",
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };
    return {
      loading,
      fileSizeError,
      touched,
      teamMembersLength,
      formDataTemp,
      verticalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      handleTouch,
    };
  },
});
</script>
