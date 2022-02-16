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
        @blur="createDraft"
        @keypress="limitInput($event)"
        @input="
          fieldChanged($event);
          formatTelephone($event);
        "
        v-model="telephone"
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
        @blur="createDraft"
        @input="fieldChanged($event)"
        type="text"
        class="form-control form-control-lg form-control-solid"
        name="website"
        placeholder=""
        v-model="website"
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
        @blur="createDraft"
        @input="fieldChanged($event)"
        name="currencyCode"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
        v-model="currency"
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
        @blur="createDraft"
        @input="fieldChanged($event)"
        name="geoFocusCountryCode"
        class="form-select form-select-lg form-select-solid"
        data-control="select2"
        data-placeholder="Select..."
        data-allow-clear="true"
        data-hide-search="true"
        as="select"
        v-model="geoFocus"
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
import { defineComponent, ref, inject, watch, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

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
    const store = useStore();
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    let tempBusinessDraft = { ...businessDraft.value };
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
      telephone.value = (() => {
        if (telephone.value) {
          tempBusinessDraft["telephone"] = telephone.value;
          return telephone.value;
        }
        return value?.telephone ?? "";
      })();
      website.value = (() => {
        if (website.value) {
          tempBusinessDraft["website"] = website.value;
          return website.value;
        }
        return value?.website ?? "";
      })();
      currency.value = (() => {
        if (currency.value) {
          tempBusinessDraft["currencyCode"] = currency.value;
          return currency.value;
        }
        return value?.currencyCode ?? "";
      })();
      geoFocus.value = (() => {
        if (geoFocus.value) {
          tempBusinessDraft["geoFocusCountryCode"] = geoFocus.value;
          return geoFocus.value;
        }
        return value?.geoFocusCountryCode ?? "";
      })();
    });
    const formData = ref<FormData>(props.formDataTemp);
    const telephone = ref<string>("");
    const website = ref<string>("");
    const currency = ref<string>("");
    const geoFocus = ref<string>("");
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
    const fieldChanged = async (event) => {
      tempBusinessDraft[event.target.name] = event.target.value;
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    const createDraft = async () => {
      try {
        const res = await store.dispatch(Actions.CREATE_BUSINESS_DRAFT, {
          business: JSON.stringify(tempBusinessDraft),
        });
        if (res !== true) throw new Error("error in API");
        store.dispatch(Actions.GET_BUSINESS_DRAFT);
      } catch (err) {
        console.log({ err });
      }
    };
    return {
      createDraft,
      formData,
      fieldChanged,
      limitInput,
      telephone,
      formatTelephone,
      businessDraft,
      website,
      geoFocus,
      currency,
    };
  },
});
</script>
