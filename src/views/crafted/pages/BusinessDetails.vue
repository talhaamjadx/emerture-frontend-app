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
              :src="business.logo ?? require('@/assets/img/blank.png')"
              alt="image"
            />
          </div>
          <h3 class="fw-bolder m-0 mx-3">{{ business.name }}</h3>
        </div>
        <!--end::Card title-->

        <!--begin::Action-->
        <router-link
          :to="`/update-investment-opportunity/${route.params.id}`"
          class="btn btn-primary align-self-center mx-5"
          >Edit</router-link
        >
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
          <label class="col-lg-4 fw-bold text-muted"> Geo Base </label>
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
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">The Team Members</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <div
              v-for="(member, index) in parseJSON(business.teamMembers)"
              :key="`team-member-${index}`"
            >
              <span class="fw-bolder fs-6 text-dark float-right"
                >{{ member.name }} ({{ member.jobTitle }})
                <a :href="member.linkedInProfileUrl" target="_blank"
                  >LinkedIn Profile</a
                ></span
              >
            </div>
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
        <div class="card-toolbar">
          <router-link
            :to="`/create-funding-round?businessId=${business.id}`"
            type="button"
            class="btn btn-sm btn-primary"
            >New</router-link
          >
        </div>
      </div>
      <div class="card-body pt-0">
        <FundingRounds :businessId="business.id" />
      </div>
    </div>
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import FundingRounds from "@/components/widgets/lists/funding-rounds.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "business-details",
  components: {
    FundingRounds,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const business = ref<Record<string, unknown>>({});
    const businesses = computed(() => store.getters.getBusinesses);
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
    onMounted(async () => {
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
        } catch (err) {
          console.log(err);
        }
      } else
        business.value = businesses.value?.founderBusinesses.find(
          (b) => b.id == route.params.id
        );
      setCurrentPageBreadcrumbs("Business Details", ["Business"]);
    });
    return {
      business,
      toUpperCase,
      parseJSON,
      route,
    };
  },
});
</script>