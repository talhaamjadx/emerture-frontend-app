<template>
  <div>
    <div
      v-for="business in businesses.founderBusinesses"
      :key="business.id"
      class="card h-175px bgi-no-repeat bgi-size-contain h-200px mb-5 mb-lg-10"
      :style="[
        'background-color: #1b283f',
        'background-position: right',
        `background-image: url('${business.headerImage}')`
        ]
      "
    >
      <!--begin::Body-->
      <div class="card-body d-flex flex-column justify-content-between">
        <!--begin::Title-->
        <h2 class="text-white fw-bolder mb-5">
          <span class="lh-lg"
            >{{ business.name }}</span
          >
        </h2>
        <p class="text-white">{{ business.summary }}</p>
        <!--end::Title-->
        <!--begin::Action-->
        <div class="m-0">
          <router-link
            :to="`/business/${business.id}`"
            class="btn btn-danger fw-bold px-6 py-3"
            >View Business</router-link
          >
        </div>
        <!--begin::Action-->
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Mutations, Actions } from "@/store/enums/StoreEnums";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";

export default defineComponent({
  setup() {
    const store = useStore();
    const businesses = computed(() => store.getters.getBusinesses)
    store.commit(Mutations.SET_TOOLBAR_BUTTON, {
      shouldShow: true,
      title: "create",
      url: "/create-investment-oppertunity",
    });
    onMounted(() => {
      setCurrentPageBreadcrumbs("Businesses", [])
      store.dispatch(Actions.GET_FOUNDER_BUSINESSES, {
        page: 1,
        perPage: 10
      })
    })
    onBeforeUnmount(() => {
      store.commit(Mutations.SET_TOOLBAR_BUTTON, {
        shouldShow: false,
        title: "",
        url: "",
      });
    });
    return{
      businesses
    }
  },
});
</script>
