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
              :src="
                op.get(expert, 'user.profileImage', null) ??
                require('@/assets/img/blank.png')
              "
              alt="image"
            />
          </div>
          <h3 class="fw-bolder m-0 mx-3">{{ expert.name }}</h3>
        </div>
        <div class="d-flex align-items-center mx-5">
          <a
            v-if="isConnected"
            href="javacript:void(0)"
            class="btn btn-sm btn-light-primary"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/arrows/arr012.svg" />
            </span>
            Connected
          </a>
          <a
            :data-kt-indicator="loading ? 'on' : null"
            @click="attachExpert"
            v-else
            href="javascript:void(0)"
            class="btn btn-sm btn-light"
          >
            <span v-if="!loading" class="indicator-label">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Connect
            </span>
            <span class="indicator-progress">
              Please wait...
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span
            ></span>
          </a>
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
                >{{
                  op.get(expert, "externalDocumentUrl", "None") ?? "None"
                }}</a
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
              {{
                arrayStringConstructor(op.get(expert, "industrySectors", []))
              }}
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
              {{ arrayStringConstructor(op.get(expert, "expertise", [])) }}
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
import { defineComponent, onMounted, computed, ref, watchEffect } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
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
    const loading = ref<boolean>(false);
    const user = computed(() => store.getters.getUser);
    const op = computed(() => objectPath);
    const store = useStore();
    const route = useRoute();
    const expert = ref<Record<string, unknown>>({});
    const founderRequisiteExperts = ref<Array<Record<string, unknown>>>([]);
    watchEffect(() => {
      founderRequisiteExperts.value = user.value.founderRequisiteExpert;
    });
    const isConnected = computed(() => {
      return founderRequisiteExperts.value.some((expert) => {
        return (
          objectPath.get(expert, "id", false) ==
          (route.params.id as string | boolean)
        );
      });
    });
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
    const attachExpert = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.FOUNDER_REQUISITE_EXPERT,
          {
            expertId: route.params.id,
          }
        );
        if (response !== true) throw new Error();
        store.dispatch(Actions.AUTH_USER);
        loading.value = false;
        store.commit("setAlert", {
          message: "Success",
          subMessage: "A Request has been sent to the expert",
          variant: "primary",
          duration: 4000,
          show: true,
        });
      } catch (err) {
        loading.value = false;
        store.commit("setAlert", {
          message: "Error",
          subMessage:
            "Sorry, looks like there are some errors detected, please try again.",
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };
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
        "Find Investment Opportunities",
      ]);
    });
    return {
      loading,
      isConnected,
      attachExpert,
      toUpperCase,
      parseJSON,
      route,
      expert,
      op,
      arrayStringConstructor,
    };
  },
});
</script>