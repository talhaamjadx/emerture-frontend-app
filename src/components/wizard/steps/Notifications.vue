<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Notifications</h2>
      <div class="text-gray-400 fw-bold fs-6">
        Decide the frequency of receiving communications from us with curated
        investment opportunities.
      </div>
    </div>
    <!--end::Heading-->
    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">How often should we update you?</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="notification"
        @input="fieldChanged($event)"
        name="notification"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
      >
        <option selected value="daily">Daily</option>
        <option value="twiceAWeek">Twice a Week</option>
        <option value="weekly">Weekly</option>
        <option value="everyOtherWeek">Every Other Week</option>
        <option value="monthly">Monthly</option>
      </Field>
      <!--end::Input-->
      <ErrorMessage
        name="notification"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, reactive, watch, inject, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "notifications",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<Record<string, unknown>>(props.formDataTemp);
    const notification = ref<string | unknown>("")
    const investorProfile = inject("investorProfile");
    watch(() => props.formDataTemp, () => {
      formData.value = props.formDataTemp
    })
    watch(investorProfile as Record<string, unknown>, (value) => {
        notification.value = value.notification
    })
    const fieldChanged = (event) => {
      formData.value[event.target.name] = event.target.value;
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
      notification
    };
  },
});
</script>
