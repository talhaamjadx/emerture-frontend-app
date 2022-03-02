<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Personal Details</h2>
    </div>
    <!--end::Heading-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="form-label required">Name</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        v-model="name"
        @input="fieldChanged($event)"
        name="name"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <ErrorMessage
        name="name"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--begin::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Job Title</span>

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
        v-model="jobTitle"
        @input="fieldChanged($event)"
        name="jobTitle"
        class="form-control form-control-lg form-control-solid"
        value=""
      />
      <!--end::Input-->
      <ErrorMessage
        name="jobTitle"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>

      <!--begin::Hint-->
      <div class="form-text">
        Customers will see this shortened version of your statement descriptor
      </div>
      <!--end::Hint-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">Telephone</span>

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
        @keypress="limitInput($event)"
        v-model="telephone"
        @input="
          fieldChanged($event);
          formatTelephone($event);
        "
        type="text"
        name="telephone"
        class="form-control form-control-lg form-control-solid"
        rows="3"
      ></Field>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="d-flex align-items-center form-label">
        <span class="required">LinkedIn Profile Url</span>

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
        v-model="linkedInProfileUrl"
        @input="fieldChanged($event)"
        type="text"
        name="linkedInProfileUrl"
        class="form-control form-control-lg form-control-solid"
        rows="3"
      ></Field>
      <ErrorMessage
        name="linkedInProfileUrl"
        class="fv-plugins-message-container invalid-feedback"
      ></ErrorMessage>
      <!--end::Input-->
    </div>
    <!--end::Input group-->

    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, inject, watch, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useStore } from "vuex";

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
    const user = computed(() => store.getters.getUser);
    const name = ref<string | unknown>("");
    const jobTitle = ref<string | unknown>("");
    const telephone = ref<string | unknown>("");
    name.value = user.value?.firstName + " " + user.value?.lastName;
    telephone.value = user.value?.telephone;
    const formData = ref<FormData>(props.formDataTemp);
    formData.value.append("name", name.value as string);
    formData.value.append("telephone", telephone.value as string);
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
    const linkedInProfileUrl = ref<string | unknown>("");
    const expertProfile = inject("expertProfile");
    const limitInput = (event) => {
      if (event.target.value.length > 11) event.preventDefault();
      if (event.charCode < 48 || event.charCode > 57) {
        event.preventDefault();
      }
    };
    const fetchData = (value) => {
      name.value = value.name;
      jobTitle.value = value.jobTitle;
      telephone.value = value.telephone;
      linkedInProfileUrl.value = value.linkedInProfileUrl;
      formData.value.append("name", name.value as string);
      formData.value.append("jobTitle", jobTitle.value as string);
      formData.value.append("telephone", telephone.value as string);
      formData.value.append(
        "linkedInProfileUrl",
        linkedInProfileUrl.value as string
      );
    };
    watch(expertProfile as Record<string, unknown>, (value) => {
      fetchData(value);
    });
    if ((expertProfile as Record<string, unknown>).value)
      fetchData((expertProfile as Record<string, unknown>).value);
    const fieldChanged = (event) => {
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      name,
      jobTitle,
      telephone,
      linkedInProfileUrl,
      expertProfile,
      formData,
      fieldChanged,
      limitInput,
      formatTelephone,
    };
  },
});
</script>
