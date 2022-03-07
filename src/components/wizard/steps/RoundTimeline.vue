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
        v-model="opensAt"
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
        v-model="closesAt"
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
  name: "PersonalDetails",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const opensAt = ref<string>("");
    const closesAt = ref<string>("");
    watch(opensAt, (value) => {
      const event = {
        target: {
          name: "fundingRoundOpensAt",
          value: moment(value).format("YYYY-MM-DD"),
        },
      };
      fieldChanged(event);
    });
    watch(closesAt, (value) => {
      const event = {
        target: {
          name: "fundingRoundClosesAt",
          value: moment(value).format("YYYY-MM-DD"),
        },
      };
      fieldChanged(event);
    });
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      opensAt,
      closesAt,
      formData,
      fieldChanged,
    };
  },
});
</script>
