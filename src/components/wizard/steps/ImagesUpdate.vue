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
            :style="`background-image: ${
              newImageAddedLogo
                ? `url(${tempImageLogo})`
                : `url(${business.logo})`
            }`"
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
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";

export default defineComponent({
  name: "ImagesUpdate",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formData = ref<FormData>(props.formDataTemp);
    const document = ref<string | unknown>("");
    const business = inject("business");
    const newImageAddedLogo = ref<boolean>(false);
    const tempImageLogo = ref<string>("");
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (file) => {
        tempImageLogo.value = file?.target?.result as string;
        newImageAddedLogo.value = true;
      };
      const tempEvent = {
        target: {
          name: event.target.name,
          value: file,
        },
      };
      fieldChanged(tempEvent);
    };
    const fieldChanged = (event) => {
      console.log({ event });
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
      business,
      newImageAddedLogo,
      tempImageLogo,
    };
  },
});
</script>
