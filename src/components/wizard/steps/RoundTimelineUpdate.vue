<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Round Timelime</h2>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Opens At</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <el-date-picker
        name="fundingRoundOpensAt"
        type="date"
        v-model="fundingRoundOpensAt"
        placeholder="Pick a Starting Date"
        format="DD-MM-YYYY"
      >
      </el-date-picker>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Closes At</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <el-date-picker
        name="fundingRoundClosesAt"
        type="date"
        v-model="fundingRoundClosesAt"
        placeholder="Pick an Ending Date"
        format="DD-MM-YYYY"
      >
      </el-date-picker>
    </div>
    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import moment from "moment";

export default defineComponent({
  name: "round-timeline-update",
  props: {
    fundingRound: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<Record<string, unknown>>(props.fundingRound);
    const fundingRoundOpensAt = ref<string>("");
    const fundingRoundClosesAt = ref<string>("");
    const syncData = (value) => {
      fundingRoundOpensAt.value = moment(value.fundingRoundOpensAt).format(
        "YYYY-MM-DD"
      );
      fundingRoundClosesAt.value = moment(value.fundingRoundClosesAt).format(
        "YYYY-MM-DD"
      );
    };
    watch(fundingRoundOpensAt, (value) => {
      const event = {
        target: {
          name: "fundingRoundOpensAt",
          value: moment(value).format("YYYY-MM-DD"),
        },
      };
      fieldChanged(event);
    });
    watch(fundingRoundClosesAt, (value) => {
      const event = {
        target: {
          name: "fundingRoundClosesAt",
          value: moment(value).format("YYYY-MM-DD"),
        },
      };
      fieldChanged(event);
    });
    watch(
      () => props.fundingRound,
      (value) => {
        formData.value = value;
        syncData(value);
      }
    );
    const fieldChanged = (event) => {
      formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      fundingRoundOpensAt,
      fundingRoundClosesAt,
    };
  },
});
</script>
