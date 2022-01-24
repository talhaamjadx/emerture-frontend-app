<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Business Details</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Telephone</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @input="fieldChanged($event)"
        type="textarea"
        name="telephone"
        class="form-control form-control-lg form-control-solid"
        rows="10"
      ></Field>
      <ErrorMessage
        name="telephone"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Website</label>
      <!--end::Label-->

      <Field
        @input="fieldChanged($event)"
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="website"
        placeholder=""
        value=""
      />
      <ErrorMessage
        name="website"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Currency</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @input="fieldChanged($event)"
        name="currencyCode"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
      >
        <option selected value="pound">£ (Pounds Sterling)</option>
        <option value="dollar">$ (US Dollars)</option>
        <option value="euro">€ (Euros)</option>
      </Field>
      <!--end::Input-->
      <ErrorMessage
        name="currencyCode"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Geo Focus</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @input="fieldChanged($event)"
        name="geoFocusCountryCode"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
      >
        <option selected value="uk">UK</option>
        <option value="us">US</option>
        <option value="eu">EU</option>
        <option value="global">Global</option>
      </Field>
      <!--end::Input-->
      <ErrorMessage
        name="geoFocusCountryCode"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";

export default defineComponent({
  name: "ProfessionalSummary",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const fieldChanged = (event) => {
      if (formData.value.get(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      formData,
      fieldChanged,
    };
  },
});
</script>
