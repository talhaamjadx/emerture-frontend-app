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
        @blur="createDraft"
        @input="fieldChanged($event)"
        name="fundingRoundName"
        class="form-control form-control-lg form-control-solid"
        v-model="fundingRoundName"
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
      <span class="required form-label"> Investment Required</span>

      <i
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-html="true"
      >
      </i>
      <div class="input-group mb-3" style="margin-top: 6px">
        <span class="input-group-text">£</span>
        <Field
          @blur="createDraft"
          as="input"
          type="text"
          @input="
            fieldChanged($event);
            formatInput($event);
          "
          style="background-color: #f5f8fa"
          @keypress="limitInput($event)"
          name="fundingRoundInvestmentRequired"
          class="form-control py-4 form-control-lg form-control-solid"
          v-model="fundingRoundInvestmentRequired"
        />
        <!--end::Input-->
        <ErrorMessage
          name="fundingRoundInvestmentRequired"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <span class="required form-label">Pre-Money Valuation</span>

      <i
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-html="true"
      >
      </i>
      <div class="input-group mb-3" style="margin-top: 6px">
        <span class="input-group-text">£</span>
        <Field
          @blur="createDraft"
          as="input"
          type="text"
          @input="
            fieldChanged($event);
            formatInput($event);
          "
          style="background-color: #f5f8fa"
          @keypress="limitInput($event)"
          name="fundingRoundPreMoneyValuation"
          class="form-control py-4 form-control-lg form-control-solid"
          v-model="fundingRoundPreMoneyValuation"
        />
        <!--end::Input-->
        <ErrorMessage
          name="fundingRoundPreMoneyValuation"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <span class="required form-label">Minimum Investment</span>

      <i
        class="fas fa-exclamation-circle ms-2 fs-7"
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-html="true"
      >
      </i>
      <div class="input-group mb-3" style="margin-top: 6px">
        <span class="input-group-text">£</span>
        <Field
          @blur="createDraft"
          as="input"
          type="text"
          @input="
            fieldChanged($event);
            formatInput($event);
          "
          style="background-color: #f5f8fa"
          @keypress="limitInput($event)"
          name="fundingRoundMinimumInvestment"
          class="form-control py-4 form-control-lg form-control-solid"
          v-model="fundingRoundMinimumInvestment"
        />
        <!--end::Input-->
        <ErrorMessage
          name="fundingRoundMinimumInvestment"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
      </div>
      <!--end::Label-->
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
        format="DD-MM-YYYY">

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
        format="DD-MM-YYYY">
      </el-date-picker>
    </div>
    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { numberFormatter } from "@/utils/index";
import moment from "moment";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

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
    const store = useStore();
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    const fundingRoundName = ref<string>("");
    const fundingRoundMinimumInvestment = ref<string>("");
    const fundingRoundPreMoneyValuation = ref<string>("");
    const fundingRoundInvestmentRequired = ref<string>("");
    const opensAt = ref<string>("");
    const closesAt = ref<string>("");
    let tempBusinessDraft = { ...businessDraft.value };
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
      fundingRoundName.value = (() => {
        if (fundingRoundName.value) {
          tempBusinessDraft["fundingRoundName"] = fundingRoundName.value;
          return fundingRoundName.value;
        }
        return value?.fundingRoundName ?? "";
      })();
      fundingRoundMinimumInvestment.value = (() => {
        if (fundingRoundMinimumInvestment.value) {
          tempBusinessDraft["fundingRoundMinimumInvestment"] = fundingRoundMinimumInvestment.value.replace(/,/g, "").toString();
          return fundingRoundMinimumInvestment.value.replace(/,/g, "").toString();
        }
        return value?.fundingRoundMinimumInvestment ?? "";
      })();
      fundingRoundPreMoneyValuation.value = (() => {
        if (fundingRoundPreMoneyValuation.value) {
          tempBusinessDraft["fundingRoundPreMoneyValuation"] =
            fundingRoundPreMoneyValuation.value.replace(/,/g, "").toString();
          return fundingRoundPreMoneyValuation.value.replace(/,/g, "").toString();
        }
        return value?.fundingRoundPreMoneyValuation ?? "";
      })();
      fundingRoundInvestmentRequired.value = (() => {
        if (fundingRoundInvestmentRequired.value) {
          tempBusinessDraft["fundingRoundInvestmentRequired"] =
            fundingRoundInvestmentRequired.value.replace(/,/g, "").toString();
          return fundingRoundInvestmentRequired.value.replace(/,/g, "").toString();
        }
        return value?.fundingRoundInvestmentRequired ?? "";
      })();
      opensAt.value = (() => {
        if (opensAt.value) {
          tempBusinessDraft["fundingRoundOpensAt"] = opensAt.value;
          return opensAt.value;
        }
        return value?.fundingRoundOpensAt ?? "";
      })();
      closesAt.value = (() => {
        if (closesAt.value) {
          tempBusinessDraft["fundingRoundClosesAt"] = closesAt.value;
          return closesAt.value;
        }
        return value?.fundingRoundClosesAt ?? "";
      })();
    });
    const formatter = numberFormatter;
    watch(opensAt, (value) => {
      tempBusinessDraft["fundingRoundOpensAt"] =
        moment(value).format("YYYY-MM-DD");
      createDraft();
    });
    watch(closesAt, (value) => {
      tempBusinessDraft["fundingRoundClosesAt"] =
        moment(value).format("YYYY-MM-DD");
      createDraft();
    });
    const formatInput = (e) => {
      if (!e.target.value) {
        if (e.target.name == "fundingRoundInvestmentRequired")
          fundingRoundInvestmentRequired.value = "";
        if (e.target.name == "fundingRoundMinimumInvestment")
          fundingRoundMinimumInvestment.value = "";
        if (e.target.name == "fundingRoundPreMoneyValuation")
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
    const fieldChanged = async (event) => {
      if (
        event.target.name == "fundingRoundInvestmentRequired" ||
        event.target.name == "fundingRoundMinimumInvestment" ||
        event.target.name == "fundingRoundPreMoneyValuation"
      ) {
        tempBusinessDraft[event.target.name] = event.target.value.replace(
          /,/g,
          ""
        );
      } else {
        tempBusinessDraft[event.target.name] = event.target.value;
      }
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
      limitInput,
      formData,
      fieldChanged,
      fundingRoundInvestmentRequired,
      fundingRoundMinimumInvestment,
      fundingRoundPreMoneyValuation,
      formatInput,
      opensAt,
      closesAt,
      fundingRoundName,
    };
  },
});
</script>
