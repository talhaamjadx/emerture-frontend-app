<template>
  <!--begin::Col-->
  <div>
    <!--begin::Card-->
    <div class="card" :class="cardClasses">
      <!--begin::Card body-->
      <div
        class="card-body d-flex flex-center flex-column p-9 border"
        style="background-color: #f5f8fa; border-radius: 7px"
      >
        <!--begin::Avatar-->
        <div v-if="avatar" class="symbol symbol-65px symbol-circle mb-5">
          <img
            :style="`
              background-image: url('${profilePicture ?? avatar}');
              background-size: cover;`"
          />
        </div>
        <div v-else class="symbol symbol-65px symbol-circle mb-5">
          <span
            :class="`text-${color} bg-light-${color}`"
            class="symbol-label fs-2x fw-bold"
            >{{ initials }}</span
          >
          <div
            v-if="online"
            class="
              bg-success
              position-absolute
              rounded-circle
              translate-middle
              start-100
              top-100
              border border-4 border-white
              h-15px
              w-15px
              ms-n3
              mt-n3
            "
          ></div>
        </div>
        <!--end::Avatar-->

        <!--begin::Name-->
        <a
          href="javascript:void(0)"
          class="fs-4 text-gray-800 text-hover-primary fw-bolder mb-0"
          style="text-transform: capitalize"
          >{{ name }}</a
        >
        <!--end::Name-->

        <!--begin::Position-->
        <div
          style="text-transform: capitalize"
          class="fw-bold text-gray-400 mb-6"
        >
          {{ jobTitle }}
        </div>
        <!--end::Position-->

        <!--begin::Info-->
        <div class="d-flex flex-center flex-wrap mb-5 flex-column">
          <!--begin::Stats-->
          <div class="min-w-125px py-3 px-4 mx-3 mb-3">
            <div
              style="text-align: center"
              class="fs-6 fw-bolder text-gray-700"
            >
              <a target="_blank" :href="linkedInProfile">LinkedIn</a>
            </div>
          </div>
          <!--end::Stats-->

          <!--begin::Stats-->
          <div class="min-w-125px py-3 px-4 mx-3 mb-3">
            <div
              style="text-align: center"
              class="fs-6 fw-bolder text-gray-700"
            >
              {{ introduction }}
            </div>
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->

        <!--begin::Follow-->
        <router-link
          :to="`/expert/${expertId}`"
          class="btn btn-sm btn-light-primary my-2"
          style="padding-right: 31px; padding-left: 31px"
        >
          View Profile
        </router-link>
        <div v-if="!fromConnectedExperts">
          <a
            v-if="
              isConnected && expertRequisiteConnectionStatus[expertId] !== ''
            "
            href="javacript:void(0)"
            class="btn btn-sm btn-light-primary"
          >
            <span class="svg-icon svg-icon-3">
              <inline-svg src="media/icons/duotune/arrows/arr012.svg" />
            </span>
            {{
              expertRequisiteConnectionStatus[expertId] == 0
                ? "Pending"
                : expertRequisiteConnectionStatus[expertId] == 1
                ? "Connected"
                : expertRequisiteConnectionStatus[expertId] == 2
                ? "Rejected"
                : ""
            }}
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
        <!--end::Follow-->
      </div>
      <!--begin::Card body-->
    </div>
    <!--begin::Card-->
  </div>
  <!--end::Col-->
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "card-3",
  components: {},
  props: {
    cardClasses: String,

    avatar: String,

    online: Boolean,

    initials: String,

    color: String,

    name: String,

    jobTitle: String,

    avgEarnings: String,

    totalSales: String,

    connected: Boolean,

    profilePicture: String,

    linkedInProfile: String,

    introduction: String,

    expertId: String,

    isAlreadyConnected: Boolean,

    fromConnectedExperts: Boolean,

    founderRequisiteExpertsMain: Array,

    expertRequisiteConnectionStatus: Object,
  },
  setup(props) {
    const loading = ref<boolean>(false);
    const store = useStore();
    const isConnected = ref<boolean>(props.isAlreadyConnected);
    const founderRequisiteExperts = ref<Array<Record<string, unknown>>>([]);
    watch(
      () => props.isAlreadyConnected,
      (value) => (isConnected.value = value)
    );
    const attachExpert = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.FOUNDER_REQUISITE_EXPERT,
          {
            expertId: props.expertId,
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
    return {
      loading,
      attachExpert,
      isConnected,
      founderRequisiteExperts,
    };
  },
});
</script>
