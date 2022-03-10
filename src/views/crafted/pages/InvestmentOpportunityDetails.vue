<template>
  <!--begin::details View-->
  <div>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer p-9">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <div
            class="
              symbol symbol-100px symbol-lg-160px symbol-fixed
              position-relative
            "
          >
            <img
              style="object-fit: contain"
              :src="business.logo ?? require('@/assets/img/blank.png')"
              alt="image"
            />
          </div>
          <h3 class="fw-bolder m-0 mx-3">{{ business.name }}</h3>
        </div>
        <div v-if="hasInvestorRole" class="d-flex align-items-center">
          <button
            v-if="!connectedIds[business.id]"
            data-bs-toggle="modal"
            :data-bs-target="`#kt_modal_delete_round_disclaimer_${business.id}`"
            type="button"
            class="btn btn-primary my-sm-2 my-3"
          >
            Request Virtual Pitch Event
          </button>
          <button
            v-else
            disabled
            type="button"
            class="btn btn-primary my-sm-2 my-3"
          >
            Requested
          </button>
        </div>
        <!--end::Card title-->

        <!--begin::Action-->
        <!--end::Action-->
      </div>
      <!--begin::Card header-->

      <!--begin::Card body-->
      <div class="card-body p-9">
        <a
          v-if="business.pitchDeckDocument"
          download
          :href="business.pitchDeckDocument"
          class="btn btn-primary my-3"
          ><i class="fas fa-download fs-4 me-2"></i> Pitch Deck</a
        >
        <div class="row my-3"><h3>About</h3></div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Name</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">{{ business.name }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Summary</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span class="fw-bold fs-6">{{ business.summary }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Overview </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 d-flex align-items-center">
            <span class="fw-bolder fs-6 me-2">{{ business.overview }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">USP</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 me-2">{{
              business.defensibleUsp
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Geo Focus </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">{{
              toUpperCase(business.geoFocusCountryCode)
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div v-if="parseJSON(business.teamMembers)?.length" class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">The Team Members</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div
            v-for="(member, index) in parseJSON(business.teamMembers)"
            :key="`team-member-${index}`"
            class="col-lg-8"
          >
            <span class="fw-bolder fs-6 text-dark"
              >{{ member.name }} ({{ member.jobTitle }})
              <a :href="member.linkedInProfileUrl" target="_blank"
                >LinkedIn Profile</a
              ></span
            >
          </div>
          <!--end::Col-->
        </div>
      </div>
      <!--end::Card body-->
    </div>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div class="card-body p-9">
        <div class="row my-3"><h3>Contact Details</h3></div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Telephone</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">{{
              business.telephone
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Website</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">{{ business.website }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Advanced Assurance</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div
            v-if="
              business.advancedAssuranceSies &&
              business.advancedAssuranceEis &&
              business.advancedAssuranceAppliedFor
            "
            class="col-lg-8"
          >
            <span class="fw-bolder fs-6 text-dark">{{
              business.advancedAssuranceSies
            }}</span
            >&nbsp;
            <span class="fw-bolder fs-6 text-dark">{{
              business.advancedAssuranceEis
            }}</span
            >&nbsp;
            <span class="fw-bolder fs-6 text-dark">{{
              business.advancedAssuranceAppliedFor
            }}</span
            >&nbsp;
          </div>
          <div v-else class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">None</span>
          </div>
          <!--end::Col-->
        </div>
      </div>
    </div>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div class="card-body p-9">
        <div class="row my-3"><h3>Industry Sectors</h3></div>
        <div class="row mb-7">
          <!--begin::Col-->
          <div class="col-lg-8">
            <span
              v-for="sector in business.industrySectors"
              :key="sector.id"
              class="badge badge-light-primary me-2"
              >{{ sector.name }}&nbsp;</span
            >
          </div>
          <!--end::Col-->
        </div>
      </div>
    </div>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <div class="card-header">
        <h3 class="card-title">Funding Rounds</h3>
      </div>
      <div class="card-body pt-0">
        <FundingRounds :fundingRounds="business?.fundingRounds ?? []" />
      </div>
    </div>
  </div>
  <DisclaimerModal
    :key="business.id"
    @connected="refresh()"
    :businessId="business.id"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";
import FundingRounds from "@/components/widgets/lists/funding-round-details-only.vue";
import DisclaimerModal from "@/components/modals/forms/DisclaimerModal.vue";

export default defineComponent({
  name: "business-details",
  components: {
    FundingRounds,
    DisclaimerModal,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser)
    const hasInvestorRole = computed(() => {
      return user.value?.userRoles?.some(
        (role) => role.name.toLowerCase() == "investor"
      );
    });
    const route = useRoute();
    const business = ref<Record<string, unknown>>({});
    const toUpperCase = (value) => {
      return value?.toUpperCase();
    };
    const parseJSON = (value) => {
      try {
        return value ? JSON.parse(value) : [];
      } catch (err) {
        return [];
      }
    };
    let connectedIds = ref<Record<string, unknown>>({});
    const refresh = async () => {
      try {
        const response = await store.dispatch(
          Actions.CONNECTED_INVESTMENT_OPPORTUNITIES
        );
        if (!response.success) throw new Error();
        connectedIds.value = {};
        for (let i = 0; i < response.data.length; i++) {
          connectedIds.value[response.data?.[i]?.founderBusiness?.id] = true;
        }
      } catch (err) {
        //
      }
    };
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_INVESTMENT_OPPORTUNITY_PROFILE,
          route.params.id
        );
        if (!response.success) throw new Error();
        business.value = response.data;
      } catch (err) {
        //
      }
      refresh();
      setCurrentPageBreadcrumbs("Investment Opportunity Details", [
        "Find Investment Opportunities",
      ]);
    });
    return {
      connectedIds,
      business,
      toUpperCase,
      parseJSON,
      route,
      refresh,
      hasInvestorRole
    };
  },
});
</script>