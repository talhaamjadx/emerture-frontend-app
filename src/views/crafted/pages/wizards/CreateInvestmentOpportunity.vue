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
          <div class="stepper-item" data-kt-stepper-element="nav">
            <!--begin::Line-->
            <div class="stepper-line w-40px"></div>
            <!--end::Line-->

            <!--begin::Icon-->
            <div class="stepper-icon w-40px h-40px">
              <i class="stepper-check fas fa-check"></i>
              <span class="stepper-number">9</span>
            </div>
            <!--end::Icon-->

            <!--begin::Label-->
            <div class="stepper-label">
              <h3 class="stepper-title">Find Experts</h3>
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
            @file-size-error="fileSizeError = $event"
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
            @resetTouch="touched = $event"
            :touchedParent="touched"
            @teamMembersLength="teamMembersLength = $event"
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></TeamMembers>
        </div>
        <div data-kt-stepper-element="content">
          <IndustrySectorsBusinesses
            @industrySectorsLength="industrySectorsLength = $event"
            @resetTouch="touchedIndustrySector = $event"
            :touchedParent="touchedIndustrySector"
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></IndustrySectorsBusinesses>
        </div>
        <div data-kt-stepper-element="content">
          <FundingRound
            @opensAtAdded="opensAtAdded = $event"
            @closesAtAdded="closesAtAdded = $event"
            @areDatesValid="areDatesValid = $event"
            @form-data="formDataTemp = $event"
            :formDataTemp="formDataTemp"
          ></FundingRound>
        </div>
        <div data-kt-stepper-element="content">
          <FindExperts></FindExperts>
        </div>
        <!--end::Step 4-->
        <!--begin::Actions-->
        <div class="d-flex flex-stack pt-10">
          <!--begin::Wrapper-->
          <div class="mr-2">
            <button
              type="button"
              class="btn btn-lg me-3"
              data-kt-stepper-action="previous"
              @click="previousStep"
              style="color: #ffffff; background-color: #236db5"
            >
              <span class="svg-icon svg-icon-4 me-1">
                <inline-svg
                  src="media/icons/duotune/arrows/arr063.svg"
                  style="color: #ffffff"
                />
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
              class="btn btn-lg me-3"
              data-kt-stepper-action="submit"
              v-if="currentStepIndex === totalSteps - 1"
              @click="formSubmit()"
              style="color: #ffffff; background-color: #236db5"
            >
              <span v-if="!loading" class="indicator-label">
                Next
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg
                    src="media/icons/duotune/arrows/arr064.svg"
                    style="color: #ffffff"
                  />
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
              v-else
              type="submit"
              class="btn btn-lg"
              style="color: #ffffff; background-color: #236db5"
              @click="handleTouch"
            >
              Continue
              <span class="svg-icon svg-icon-4 ms-1 me-0">
                <inline-svg
                  src="media/icons/duotune/arrows/arr064.svg"
                  style="color: #ffffff"
                />
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
import { computed, defineComponent, onMounted, ref, watchEffect } from "vue";
import Images from "@/components/wizard/steps/Images.vue";
import UploadPitchDeck from "@/components/wizard/steps/UploadPitchDeck.vue";
import BusinessDescription from "@/components/wizard/steps/BusinessDescription.vue";
import BusinessDetails from "@/components/wizard/steps/BusinessDetails.vue";
import AdvancedAssurance from "@/components/wizard/steps/AdvancedAssurance.vue";
import IndustrySectorsBusinesses from "@/components/wizard/steps/IndustrySectorsBusinesses.vue";
import TeamMembers from "@/components/wizard/steps/TeamMembers.vue";
import FundingRound from "@/components/wizard/steps/FundingRound.vue";
import FindExperts from "@/views/crafted/pages/FindExperts.vue";
import { StepperComponent } from "@/assets/ts/components";
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
  name: "Investment-Opportunity",
  components: {
    FundingRound,
    Images,
    UploadPitchDeck,
    BusinessDescription,
    BusinessDetails,
    AdvancedAssurance,
    TeamMembers,
    IndustrySectorsBusinesses,
    FindExperts,
  },
  setup() {
    const opensAtAdded = ref<boolean>(false);
    const closesAtAdded = ref<boolean>(false);
    const areDatesValid = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const touched = ref<boolean>(false);
    const teamMembersLength = ref<number>(0);
    const industrySectorsLength = ref<number>(0);
    let roleId = 0;
    const roles = computed(() => {
      return store.getters.getRolesData;
    });
    const fileSizeError = ref<boolean>(false);
    const businessDraft = computed(() => store.getters.businessDraftGetter);
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
    const touchedIndustrySector = ref<boolean>(false);
    const handleTouch = () => {
      if (_stepperObj.value?.currentStepIndex == 6) touched.value = true;
      if (_stepperObj.value?.currentStepIndex == 7)
        touchedIndustrySector.value = true;
    };
    onMounted(async () => {
      _stepperObj.value = StepperComponent.createInsance(
        verticalWizardRef.value as HTMLElement
      );
      try {
        await store.dispatch(Actions.GET_BUSINESS_DRAFT);
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
      setCurrentPageBreadcrumbs("Create Investment Opportunity", [
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
      if (!teamMembersLength.value && _stepperObj.value?.currentStepIndex == 6)
        return;
      if (
        !industrySectorsLength.value &&
        _stepperObj.value?.currentStepIndex == 7
      )
        return;
      if (fileSizeError.value) return;
      if (areDatesValid.value && _stepperObj.value?.currentStepIndex == 8)
        return;
      if (
        (!opensAtAdded.value || !closesAtAdded.value) &&
        _stepperObj.value?.currentStepIndex == 8
      )
        return;
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
        if (
          !objectPath.get(user.value, "founderBusiness.length") &&
          !user.value?.userRoleRequests?.some((request) => {
            return request?.role?.name === "founder";
          })
        ) {
          const attachRoleResponse = await store.dispatch(Actions.ATTACH_ROLE, {
            id: roleId,
          });
          if (attachRoleResponse !== true) {
            loading.value = false;
            store.commit("setAlert", {
              message: "Error",
              subMessage: "`Error in Attaching Role`",
              variant: "danger",
              duration: 4000,
              show: true,
            });
            return;
          }
        }
        const response = await store.dispatch(
          Actions.CREATE_FOUNDER_BUSINESS,
          businessDraft.value
        );
        if (response !== true) throw new Error();
        const deleteResponse = await store.dispatch(
          Actions.DELETE_BUSINESS_DRAFT
        );
        if (deleteResponse !== true) throw new Error("Error in deleting draft");
        else await store.dispatch(Actions.GET_BUSINESS_DRAFT);
        loading.value = false;
        store.commit("setAlert", {
          message: "Success",
          subMessage: `Investment Opportunity ${"Created"}`,
          variant: "primary",
          duration: 4000,
          show: true,
        });
        setTimeout(async () => {
          try {
            const response = await store.dispatch(Actions.AUTH_USER);
            if (response !== true) throw new Error();
            (objectPath.get(
              user.value,
              "founderBusiness.length",
              0
            ) as number) === 1
              ? router.push("/find-experts")
              : router.push("/businesses");
          } catch (err) {
            loading.value = false;
            store.commit("setAlert", {
              message: "Error",
              subMessage: "`Error in Business Creation`",
              variant: "danger",
              duration: 4000,
              show: true,
            });
          }
        }, 2000);
      } catch (err) {
        loading.value = false;
        store.commit("setAlert", {
          message: "Error",
          subMessage: "`Investment Opportunity Creation Unsuccessful`",
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };

    return {
      touchedIndustrySector,
      industrySectorsLength,
      opensAtAdded,
      closesAtAdded,
      areDatesValid,
      loading,
      createAccountSchema,
      formDataTemp,
      verticalWizardRef,
      previousStep,
      handleStep,
      formSubmit,
      totalSteps,
      currentStepIndex,
      fileSizeError,
      teamMembersLength,
      touched,
      handleTouch,
      _stepperObj,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name === "expert-global") {
        setTimeout(() => {
          (vm as any)._stepperObj.goto(9);
        }, 1);
      }
    });
  },
});
</script>
