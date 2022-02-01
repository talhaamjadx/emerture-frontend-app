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
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">8</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Funding Round</h3>
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
          <Images
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></Images>
        </div>
        <!--end::Step 1-->

        <!--begin::Step 2-->
        <div data-kt-stepper-element="content">
          <UploadPitchDeck
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></UploadPitchDeck>
        </div>
        <!--end::Step 2-->

        <!--begin::Step 3-->
        <div data-kt-stepper-element="content">
          <BusinessDescription
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></BusinessDescription>
        </div>
        <!--end::Step 3-->

        <!--begin::Step 4-->
        <div data-kt-stepper-element="content">
          <BusinessDetails
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></BusinessDetails>
        </div>
        <div data-kt-stepper-element="content">
          <AdvancedAssurance
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></AdvancedAssurance>
        </div>
        <div data-kt-stepper-element="content">
          <TeamMembers
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></TeamMembers>
        </div>
        <div data-kt-stepper-element="content">
          <IndustrySectorsBusinesses
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></IndustrySectorsBusinesses>
        </div>
        <div data-kt-stepper-element="content">
          <FundingRound
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></FundingRound>
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
              type="button"
              class="btn btn-lg btn-primary me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
            >
              <span class="indicator-label">
                Submit
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span class="indicator-progress">
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Images from "@/components/wizard/steps/Images.vue";
import UploadPitchDeck from "@/components/wizard/steps/UploadPitchDeck.vue";
import BusinessDescription from "@/components/wizard/steps/BusinessDescription.vue";
import BusinessDetails from "@/components/wizard/steps/BusinessDetails.vue";
import AdvancedAssurance from "@/components/wizard/steps/AdvancedAssurance.vue";
import IndustrySectorsBusinesses from "@/components/wizard/steps/IndustrySectorsBusinesses.vue";
import TeamMembers from "@/components/wizard/steps/TeamMembers.vue";
import FundingRound from "@/components/wizard/steps/FundingRound.vue";
import { StepperComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { useForm } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";

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
  name: "Investment-Oppertunity",
  components: {
    FundingRound,
    Images,
    UploadPitchDeck,
    BusinessDescription,
    BusinessDetails,
    AdvancedAssurance,
    TeamMembers,
    IndustrySectorsBusinesses,
  },
  setup() {
    let roleId = 0;
    const roles = computed(() => {
      return store.getters.getRolesData;
    });
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters.getUser);
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

    onMounted(async () => {
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );
      try {
        if (!roles.value.length) {
          const response = await store.dispatch(Actions.GET_ROLES);
          if (response !== true) throw new Error();
          roleId = objectPath.get(
            roles.value.find((role) => role.name.toLowerCase() === "founder"),
            "id",
            0
          );
        } else
          roleId = objectPath.get(
            roles.value.find((role) => role.name.toLowerCase() === "founder"),
            "id",
            0
          );
      } catch (err) {
        console.log("error in fetching roles");
      }
      setCurrentPageBreadcrumbs("Create Investment Oppertunity", [
        "Businesses",
      ]);
    });
    const createAccountSchema = [
      {},
      {},
      Yup.object({
        name: Yup.string().required().label("Name"),
        summary: Yup.string().required().label("Summary"),
        overview: Yup.string().required().label("Overview"),
        defensibleUsp: Yup.string().required().label("Defensible USP"),
      }),
      Yup.object({
        telephone: Yup.string().required().label("Telephone"),
        website: Yup.string().required().label("Website"),
        currencyCode: Yup.string().required().label("Currency"),
        geoFocusCountryCode: Yup.string().required().label("Geo Focus"),
      }),
      {},
      {},
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
      console.log({ values });
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
      try {
        if (!objectPath.get(user.value, "founderBusiness.length")) {
          const attachRoleResponse = await store.dispatch(Actions.ATTACH_ROLE, {
            id: roleId,
          });
          if (attachRoleResponse !== true) {
            Swal.fire({
              text: `Error in Attaching Role`,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
            return;
          }
        }
        const response = await store.dispatch(
          Actions.CREATE_FOUNDER_BUSINESS,
          formDataTemp.value
        );
        if (response !== true) throw new Error();
        Swal.fire({
          text: `Investment Oppertunity ${"Created"}`,
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(async () => {
          try {
            const response = await store.dispatch(Actions.AUTH_USER);
            if (response !== true) throw new Error();
            (objectPath.get(user.value, "founderBusiness.length", 0) as number) == 1
              ? router.push("/find-experts")
              : router.push("/businesses");
          } catch (err) {
            Swal.fire({
              text: `Error in Business Creation`,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          }
        });
      } catch (err) {
        Swal.fire({
          text: `Investment Oppertunity Creation Unsuccessful`,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        });
      }
    };

    return {
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
