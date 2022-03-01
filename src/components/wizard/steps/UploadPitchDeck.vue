<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Upload Pitch Deck</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10 d-flex flex-column">
      <!--end::Label-->
      <label class="form-label required">Documents</label>
      <!--end::Label-->

      <!--begin::Input-->
      <Field
        id="documents"
        type="file"
        @change="handleImageUpload($event)"
        name="pitchDeckDocument"
        accept=".pptx, .ppt, .pdf, .xls, .xlsx"
        v-model="file"
      />
      <p v-if="fileSizeError" style="color: red">
        The file size must be less than 10 MBs
      </p>
      <div class="fv-plugins-message-container">
        <div class="fv-help-block">
          <ErrorMessage name="pitchDeckDocument" />
        </div>
      </div>
      <a
        target="_blank"
        v-if="businessDraft?.pitchDeckDocument"
        :href="businessDraft?.pitchDeckDocument"
        >Uploaded Document</a
      >
      <!--end::Input-->
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
      file.value = value?.pitchDeckDocument ?? null;
    });
    const formData = ref<FormData>(props.formDataTemp);
    const document = ref<string | unknown>("");
    const fileSizeError = ref<boolean>(false);
    const file = ref<string | null>(null);
    const handleImageUpload = async (event) => {
      fileSizeError.value = false;
      emit("file-size-error", false);
      try {
        const file = event.target.files[0];
        var fileSize = +(file.size / 1024 / 1024).toFixed(4);
        if (fileSize > 10) {
          fileSizeError.value = true;
          emit("file-size-error", true);
          file.value = null;
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const response = await store.dispatch(Actions.UPLOAD_FILE, formData);
        if (!response.includes("https://")) throw new Error("error in api");
        const tempEvent = {
          target: {
            name: event.target.name,
            value: response,
          },
        };
        fieldChanged(tempEvent);
        const res = await store.dispatch(Actions.CREATE_BUSINESS_DRAFT, {
          business: JSON.stringify(tempBusinessDraft),
        });
        if (res !== true) throw new Error("error in API");
        store.dispatch(Actions.GET_BUSINESS_DRAFT);
      } catch (err) {
        console.log({ err });
      }
    };
    const fieldChanged = (event) => {
      tempBusinessDraft[event.target.name] = event.target.value;
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
    };
    return {
      document,
      formData,
      fieldChanged,
      handleImageUpload,
      fileSizeError,
      file,
      businessDraft,
      tempBusinessDraft,
    };
  },
});
</script>
