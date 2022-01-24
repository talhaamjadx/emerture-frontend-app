<template>
  <div>
    <div
      class="card h-175px bgi-no-repeat bgi-size-contain h-200px mb-5 mb-lg-10"
      style="
        background-color: #1b283f;
        background-position: right;
        background-image: url('media/stock/2000x800/1.jpg');
      "
    >
      <!--begin::Body-->
      <div class="card-body d-flex flex-column justify-content-between">
        <!--begin::Title-->
        <h2 class="text-white fw-bolder mb-5">
          <span class="lh-lg"
            >Brilliant Ideas <br />for Your Web Application</span
          >
        </h2>
        <!--end::Title-->
        <!--begin::Action-->
        <div class="m-0">
          <a
            href="#"
            class="btn btn-danger fw-bold px-6 py-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_campaign"
            >Create Campaign</a
          >
        </div>
        <!--begin::Action-->
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";
import { Mutations } from "@/store/enums/StoreEnums";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  setup() {
    const store = useStore();
    store.commit(Mutations.SET_TOOLBAR_BUTTON, {
      shouldShow: true,
      title: "create",
      url: "/create-investment-oppertunity",
    });
    onMounted(() => {
      setCurrentPageBreadcrumbs("Businesses", [])
    })
    onBeforeUnmount(() => {
      store.commit(Mutations.SET_TOOLBAR_BUTTON, {
        shouldShow: false,
        title: "",
        url: "",
      });
    });
  },
});
</script>
