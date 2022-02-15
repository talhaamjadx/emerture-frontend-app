<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Funding Round</h2>
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @input="fieldChanged($event)"
        name="fundingRoundName"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <ErrorMessage
        name="fundingRoundName"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Investment Required</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        as="input"
        type="text"
        @input="
          fieldChanged($event);
          formatInput($event);
        "
        @keypress="limitInput($event)"
        name="fundingRoundInvestmentRequired"
        class="form-control form-control-lg form-control-solid"
        v-model="fundingRoundInvestmentRequired"
      />
      <!--end::Input-->
      <ErrorMessage
        name="fundingRoundInvestmentRequired"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Pre-Money Valuation</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        as="input"
        type="text"
        @input="
          fieldChanged($event);
          formatInput($event);
        "
        @keypress="limitInput($event)"
        name="fundingRoundPreMoneyValuation"
        class="form-control form-control-lg form-control-solid"
        v-model="fundingRoundPreMoneyValuation"
      ></Field>
      <ErrorMessage
        name="fundingRoundPreMoneyValuation"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Minimum Investment</span>

        <i
          class="fas fa-exclamation-circle ms-2 fs-7"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
          data-bs-html="true"
        >
        </i>
      </label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        as="input"
        type="text"
        @input="
          fieldChanged($event);
          formatInput($event);
        "
        @keypress="limitInput($event)"
        name="fundingRoundMinimumInvestment"
        class="form-control form-control-lg form-control-solid"
        v-model="fundingRoundMinimumInvestment"
      ></Field>
      <ErrorMessage
        name="fundingRoundMinimumInvestment"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->
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
      >
      </el-date-picker>
    </div>
    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { numberFormatter } from "@/utils/index";
import moment from "moment";

export default defineComponent({
  name: "PersonalDetails",
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
    const formatter = numberFormatter;
    const fundingRoundInvestmentRequired = ref<string>("");
    const fundingRoundMinimumInvestment = ref<string>("");
    const fundingRoundPreMoneyValuation = ref<string>("");
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
    watch(opensAt, (value) => {
      const event = {
        target: {
          name: "fundingRoundClosesAt",
          value: moment(value).format("YYYY-MM-DD"),
        },
      };
      fieldChanged(event);
    });
    const formatInput = (e) => {
      if (!e.target.value) {
        fundingRoundInvestmentRequired.value = "";
        fundingRoundMinimumInvestment.value = "";
        fundingRoundPreMoneyValuation.value = "";
        return;
      }
      if (e.target.name == "fundingRoundInvestmentRequired")
        fundingRoundInvestmentRequired.value = formatter(
          parseFloat(e.target.value.replace(/,/g, "")).toString(),
          "en-US"
        );
      else if (e.target.name == "fundingRoundMinimumInvestment")
        fundingRoundMinimumInvestment.value = formatter(
          parseFloat(e.target.value.replace(/,/g, "")).toString(),
          "en-US"
        );
      else if (e.target.name == "fundingRoundPreMoneyValuation")
        fundingRoundPreMoneyValuation.value = formatter(
          parseFloat(e.target.value.replace(/,/g, "")).toString(),
          "en-US"
        );
    };
    const limitInput = (event) => {
      if (event.charCode < 48 || event.charCode > 57) {
        event.preventDefault();
      }
    };
    const formData = ref<FormData>(props.formDataTemp);
    const fieldChanged = (event) => {
      console.log({ event }, "date check");
      if (formData.value.has(event.target.name)) {
        if (
          event.target.name == "fundingRoundInvestmentRequired" ||
          event.target.name == "fundingRoundMinimumInvestment" ||
          event.target.name == "fundingRoundPreMoneyValuation"
        ) {
          formData.value.set(
            event.target.name,
            event.target.value.replace(/,/g, "")
          );
        } else {
          formData.value.set(event.target.name, event.target.value);
        }
      } else {
        if (
          event.target.name == "fundingRoundInvestmentRequired" ||
          event.target.name == "fundingRoundMinimumInvestment" ||
          event.target.name == "fundingRoundPreMoneyValuation"
        ) {
          formData.value.append(
            event.target.name,
            event.target.value.replace(/,/g, "")
          );
        } else {
          formData.value.append(event.target.name, event.target.value);
        }
      }
      emit("form-data", formData.value);
    };
    return {
      limitInput,
      formData,
      fieldChanged,
      fundingRoundInvestmentRequired,
      fundingRoundMinimumInvestment,
      fundingRoundPreMoneyValuation,
      formatInput,
      opensAt,
      closesAt,
    };
  },
});
</script>
