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
      <label class="form-label required">Telephone</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="telephone"
        @keypress="limitInput($event)"
        @input="
          fieldChanged($event);
          formatTelephone($event);
        "
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
      <label class="form-label required">Website</label>
      <!--end::Label-->

      <Field
        v-model="website"
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
        v-model="currencyCode"
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
      <label class="form-label required">Geo Base</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="geoFocusCountryCode"
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
    const telephone = ref<string>("");
    const currencyCode = ref<string>("");
    const geoFocusCountryCode = ref<string>("");
    const website = ref<string>("");
    const business = inject("business");
    watch(business as Record<string, unknown>, (value) => {
      syncData(value);
    });
    const limitInput = (event) => {
      if (event.target.value.length > 11) {
        event.preventDefault();
      }
      if (event.charCode < 48 || event.charCode > 57) {
        event.preventDefault();
      }
    };
    const formatTelephone = (e) => {
      if (e.target.value.charCodeAt(0) != 48 && e.target.value) {
        telephone.value = "0" + telephone.value;
      }
      if (e.target.value.length == 6) {
        telephone.value =
          (telephone.value as string).substr(0, 5) +
          " " +
          (telephone.value as string).substr(5);
      }
    };
    const syncData = (value) => {
      telephone.value = value.telephone;
      currencyCode.value = value.currencyCode;
      geoFocusCountryCode.value = value.geoFocusCountryCode;
      website.value = value.website;
    };
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      limitInput,
      formatTelephone,
      formData,
      fieldChanged,
      telephone,
      website,
      currencyCode,
      geoFocusCountryCode,
    };
  },
});
</script>
