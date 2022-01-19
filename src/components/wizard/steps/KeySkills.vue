<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Key Skills</h2>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Areas of Expertise</label>
      <!--end::Label-->

      <div class="form-check form-check-custom form-check-solid my-3">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <!--end::Input-->
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Industry Sectors</label>
      <!--end::Label-->

      <div class="form-check form-check-custom form-check-solid my-3">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfessionalSummary",
  components: {},
});
</script>
