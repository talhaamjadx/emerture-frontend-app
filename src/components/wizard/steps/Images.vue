<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Images</h2>
    </div>
    <!--end::Heading-->
    <div class="fv-row mb-10 d-flex flex-column">
      <!--end::Label-->
      <label class="form-label">Logo</label>
      <div class="col-lg-8">
        <!--begin::Image input-->
        <div
          class="image-input image-input-outline"
          data-kt-image-input="true"
          style="background-image: url(media/avatars/blank.png)"
        >
          <!--begin::Preview existing avatar-->
          <div
            ref="profilePictureRef"
            class="image-input-wrapper w-125px h-125px"
            :style="`background-image: ${`url(${tempImageLogo})`}`"
          ></div>
          <!--end::Preview existing avatar-->

          <!--begin::Label-->
          <label
            class="
              btn btn-icon btn-circle btn-active-color-primary
              w-25px
              h-25px
              bg-white
              shadow
            "
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <i class="bi bi-pencil-fill fs-7"></i>

            <!--begin::Inputs-->
            <input
              @change="handleImageUpload($event)"
              type="file"
              name="logo"
              accept=".png, .jpg, .jpeg"
            />
            <input type="hidden" name="avatar_remove" />
            <!--end::Inputs-->
          </label>
        </div>
        <!--end::Image input-->

        <!--begin::Hint-->
        <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
        <!--end::Hint-->
      </div>
    </div>
    <div class="fv-row mb-10 d-flex flex-column">
      <!--end::Label-->
      <label class="form-label">Header Image</label>
      <div class="col-lg-8">
        <!--begin::Image input-->
        <div
          class="image-input image-input-outline"
          data-kt-image-input="true"
          style="background-image: url(media/avatars/blank.png)"
        >
          <!--begin::Preview existing avatar-->
          <div
            ref="profilePictureRef"
            class="image-input-wrapper w-125px h-125px"
            :style="`background-image: ${`url(${tempImageHeader})`}`"
          ></div>
          <!--end::Preview existing avatar-->

          <!--begin::Label-->
          <label
            class="
              btn btn-icon btn-circle btn-active-color-primary
              w-25px
              h-25px
              bg-white
              shadow
            "
            data-kt-image-input-action="change"
            data-bs-toggle="tooltip"
            title="Change avatar"
          >
            <i class="bi bi-pencil-fill fs-7"></i>

            <!--begin::Inputs-->
            <input
              @change="handleImageUpload($event)"
              type="file"
              name="headerImage"
              accept=".png, .jpg, .jpeg"
            />
            <input type="hidden" name="avatar_remove" />
            <!--end::Inputs-->
          </label>
        </div>
        <!--end::Image input-->

        <!--begin::Hint-->
        <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
        <!--end::Hint-->
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "Images",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    const tempBusinessDraft = { ...businessDraft.value };
    const formData = ref<FormData>(props.formDataTemp);
    const document = ref<string | unknown>("");
    const tempImageLogo = ref<string>("");
    const tempImageHeader = ref<string>("");
    const handleImageUpload = async (event) => {
      try {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const response = await store.dispatch(Actions.UPLOAD_FILE, formData);
        if (!response.includes("https://")) throw new Error("error in api");
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          if (event.target.name == "logo")
            tempImageLogo.value = reader.result as string;
          else if (event.target.name == "headerImage")
            tempImageHeader.value = reader.result as string;
        };
        const tempEvent = {
          target: {
            name: event.target.name,
            value: response,
          },
        };
        fieldChanged(tempEvent);
      } catch (err) {
        console.log(err);
      }
    };
    const fieldChanged = async (event) => {
      tempBusinessDraft[event.target.value] = event.target.value;
      if (formData.value.has(event.target.name)) {
        formData.value.set(event.target.name, event.target.value);
      } else formData.value.append(event.target.name, event.target.value);
      emit("form-data", formData.value);
      try {
        const response = await store.dispatch(Actions.CREATE_BUSINESS_DRAFT, {
          business: JSON.stringify(tempBusinessDraft),
        });
        if (response !== true) throw new Error("error in API");
      } catch (err) {
        console.log({ err });
      }
    };
    return {
      document,
      formData,
      fieldChanged,
      handleImageUpload,
      tempImageLogo,
      tempImageHeader,
    };
  },
});
</script>
