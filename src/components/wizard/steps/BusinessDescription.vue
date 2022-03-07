<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Business Description</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Business Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        @blur="createDraft"
        @input="fieldChanged($event)"
        type="textarea"
        name="name"
        class="form-control form-control-lg form-control-solid"
        rows="10"
        v-model="businessName"
      />
      <ErrorMessage
        name="name"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Summary</label>
      <!--end::Label-->

      <Field
        maxlength="200"
        @blur="createDraft"
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        type="text"
        v-model="summary"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="summary"
        placeholder=""
      />
      <p class="float-end my-1">{{ summary?.length }}/{{ limitLength }}</p>
      <ErrorMessage
        name="summary"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Overview</label>
      <!--end::Label-->

      <Field
        maxlength="200"
        @blur="createDraft"
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        v-model="overview"
        type="text"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="overview"
        placeholder=""
        :value="businessDraft?.overview ?? ''"
      />
      <p class="float-end my-1">{{ overview?.length }}/{{ limitLength }}</p>
      <ErrorMessage
        name="overview"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Defensible USP</label>
      <!--end::Label-->

      <Field
        maxlength="200"
        @blur="createDraft"
        @keypress="limitInput($event)"
        @input="fieldChanged($event)"
        type="text"
        v-model="defensibleUsp"
        as="textarea"
        class="form-control form-control-lg form-control-solid"
        name="defensibleUsp"
        placeholder=""
        :value="businessDraft?.defensibleUsp ?? ''"
      />
      <p class="float-end my-1">
        {{ defensibleUsp?.length }}/{{ limitLength }}
      </p>
      <ErrorMessage
        name="defensibleUsp"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
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
    const businessName = ref<string>("");
    const summary = ref<string>("");
    const defensibleUsp = ref<string>("");
    const overview = ref<string>("");
    const limitLength = 200;
    const store = useStore();
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    let tempBusinessDraft = { ...businessDraft.value };
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
      businessName.value = (() => {
        if (businessName.value) {
          tempBusinessDraft["name"] = businessName.value;
          return businessName.value;
        }
        return value?.name ?? "";
      })();
      summary.value = (() => {
        if (summary.value) {
          tempBusinessDraft["summary"] = summary.value.slice(0, 200);
          return summary.value.slice(0, 200);
        }
        return value?.summary.slice(0, 200) ?? "";
      })();
      overview.value = (() => {
        if (overview.value) {
          tempBusinessDraft["overview"] = overview.value.slice(0, 200);
          return overview.value.slice(0, 200);
        }
        return value?.overview ?? "";
      })();
      defensibleUsp.value = (() => {
        if (defensibleUsp.value) {
          tempBusinessDraft["defensibleUsp"] = defensibleUsp.value.slice(
            0,
            200
          );
          return defensibleUsp.value.slice(0, 200);
        }
        return value?.defensibleUsp.slice(0, 200) ?? "";
      })();
    });
    const limitInput = (e) => {
      if (e.target.value.length >= limitLength) e.preventDefault();
    };
    const formData = ref<FormData>(props.formDataTemp);
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
      limitLength,
      summary,
      defensibleUsp,
      overview,
      businessDraft,
      businessName,
    };
  },
});
</script>
