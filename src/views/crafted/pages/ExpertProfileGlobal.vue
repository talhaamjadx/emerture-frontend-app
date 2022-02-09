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
              :src="
                op.get(expert, 'user.profileImage', null) ??
                require('@/assets/img/150-2.jpg')
              "
              alt="image"
            />
          </div>
          <h3 class="fw-bolder m-0 mx-3">{{ expert.name }}</h3>
        </div>
      </div>
      <!--begin::Card header-->

      <!--begin::Card body-->
      <div class="card-body p-9">
        <a
          v-if="expert.document"
          download
          :href="expert.document"
          class="btn btn-primary my-3"
          ><i class="fas fa-download fs-4 me-2"></i>Document</a
        >
        <div class="row mb-7 mt-4">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Name</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">{{ expert.name }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Introduction</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span class="fw-bold fs-6">{{ expert.introduction }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted">Bio</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span class="fw-bold fs-6">{{ expert.bio }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Telephone </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 d-flex align-items-center">
            <span class="fw-bolder fs-6 me-2">{{ expert.telephone }}</span>
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
            <span class="fw-bolder fs-6 me-2">{{ expert.jobTitle }}</span>
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
                :href="op.get(expert, 'linkedInProfileUrl', '#')"
                target="_blank"
                >{{ op.get(expert, "linkedInProfileUrl", "None") ?? "None" }}</a
              >
            </span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> External Document </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">
              <a
                :href="op.get(expert, 'externalDocumentUrl', '#')"
                target="_blank"
                >{{ op.get(expert, "externalDocumentUrl", "None") ?? "None" }}</a
              >
            </span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Industry Sectors </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">
              {{ arrayStringConstructor(op.get(expert, 'industrySectors', [])) }}
            </span>
          </div>
          <!--end::Col-->
        </div>
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-bold text-muted"> Expertise </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bolder fs-6 text-dark">
              {{ arrayStringConstructor(op.get(expert, 'expertise', [])) }}
            </span>
          </div>
          <!--end::Col-->
        </div>
      </div>
      <!--end::Card body-->
    </div>
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
// import FundingRounds from "@/components/widgets/lists/funding-rounds.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";
import objectPath from "object-path";

export default defineComponent({
  name: "business-details",
  components: {
    // FundingRounds,
  },
  setup() {
    const op = computed(() => objectPath);
    const store = useStore();
    const route = useRoute();
    const expert = ref<Record<string, unknown>>({});
    const toUpperCase = (value) => {
      return value?.toUpperCase();
    };
    const parseJSON = (value) => {
      return value ? JSON.parse(value) : [];
    };
    const arrayStringConstructor = arr  => {
        let arrayString = ""
        for(let i = 0; i < arr.length; i++){
            arrayString = arrayString + `${(arr[i]).name}${arr[i+1] ? ", " : ""}`
        }
        return arrayString
    }
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_EXPERT_PROFILE_GLOBAL,
          route.params.id
        );
        if (!response.success) throw new Error();
        expert.value = response.data;
      } catch (err) {
        console.log(err);
      }
      setCurrentPageBreadcrumbs("Expert Profile", [
        "Find Investment Oppertunities",
      ]);
    });
    return {
      toUpperCase,
      parseJSON,
      route,
      expert,
      op,
      arrayStringConstructor
    };
  },
});
</script>