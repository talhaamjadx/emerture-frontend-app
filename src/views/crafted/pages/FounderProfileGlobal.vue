<template>
  <!--begin::details View-->
  <div>
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer px-0">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <div
            class="
              symbol symbol-100px symbol-lg-160px symbol-fixed
              position-relative
            "
          >
            <img
              :src="founder?.profileImage ?? require('@/assets/img/blank.png')"
              alt="image"
            />
          </div>
          <h3 class="fw-bolder m-0 mx-3">
            {{ founder?.firstName }} {{ founder?.lastName }}
          </h3>
        </div>
      </div>
      <!--begin::Card header-->

      <!--begin::Card body-->
      <div class="card-body p-9">
        <div class="row mb-7 mt-4">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Name</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark"
              >{{ founder?.firstName }} {{ founder?.lastName }}</span
            >
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Email</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span class="fw-bold fs-6">{{ founder?.email }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Telephone </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 d-flex align-items-center">
            <span class="fw-bolder fs-6 me-2">{{
              founder?.telephone ?? "None"
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Job Title</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 me-2">{{
              founder?.jobTitle ?? "None"
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> LinkedIn Profile </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">
              <a
                :href="op.get(founder, 'linkedInProfileUrl', '#')"
                target="_blank"
                >{{
                  op.get(founder, "linkedInProfileUrl", "None") ?? "None"
                }}</a
              >
            </span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Business Clicks</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 me-2">{{
              founder?.founderBusinessClicks ?? 0
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Business Shows</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 me-2">{{
              founder?.founderBusinessShows ?? 0
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Total Connections</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 me-2">{{
              founder?.founderTotalConnections ?? 0
            }}</span>
          </div>
          <!--end::Col-->
        </div>
      </div>
      <!--end::Card body-->
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header border-0" style="min-height: 60px !important">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Businesses</h3>
      </div>
      <!--end::Card title-->
    </div>
    <div v-for="business in founder.founderBusiness" :key="business.id">
      <div class="container-fluid p-0">
        <div class="row m-3 g-0">
          <div class="col-12 order-xl-first order-last">
            <div class="content" style="background-color: #1b283f">
              <div class="row">
                <div
                  class="
                    col-sm-4 col-12
                    order-sm-first order-last
                    text-center
                    offset-sm-1
                  "
                >
                  <div>
                    <img
                      class="rounded-circle my-2"
                      :src="`${business.logo ?? '/media/avatars/blank.png'}`"
                      style="
                        border: 3px solid white;
                        width: 120px;
                        height: 118px;
                        object-fit: cover;
                      "
                    />
                  </div>
                  <!-- <router-link
                    :to="`/business/${business.id}`"
                    type="button"
                    class="btn btn-danger my-sm-2 my-3"
                  >
                    View Business
                  </router-link> -->
                </div>

                <div
                  class="
                    col-sm-4 col-12
                    order-sm-last order-first
                    text-white text-center
                    my-sm-auto
                    mt-3
                    offset-sm-1
                  "
                >
                  <h3 style="color: white !important">{{ business.name }}</h3>
                  <p>{{ business.summary }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";
import objectPath from "object-path";

export default defineComponent({
  name: "founder-details",
  setup() {
    const op = computed(() => objectPath);
    const store = useStore();
    const route = useRoute();
    const founder = ref<Record<string, unknown>>({});
    const toUpperCase = (value) => {
      return value?.toUpperCase();
    };
    const parseJSON = (value) => {
      return value ? JSON.parse(value) : [];
    };
    const arrayStringConstructor = (arr) => {
      let arrayString = "";
      for (let i = 0; i < arr.length; i++) {
        arrayString = arrayString + `${arr[i].name}${arr[i + 1] ? ", " : ""}`;
      }
      return arrayString;
    };
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_USER_PROFILE,
          route.params.id
        );
        if (!response.success) throw new Error();
        founder.value = response.data;
      } catch (err) {
        console.log(err);
      }
      setCurrentPageBreadcrumbs("Expert Profile", [
        "Find Investment Opportunities",
      ]);
    });
    return {
      toUpperCase,
      parseJSON,
      route,
      founder,
      op,
      arrayStringConstructor,
    };
  },
});
</script>