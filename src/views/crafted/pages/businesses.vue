<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-end">
      <router-link to="/create-investment-opportunity" class="btn btn-primary mx-3"
        >Create</router-link
      >
    </div>
  </div>
  <div v-for="business in businesses.founderBusinesses" :key="business.id">
    <div class="container-fluid p-0">
      <div class="row m-3 g-0">
        <div class="col-12 order-xl-first order-last">
          <div class="content" style="background-color: #1b283f">
            <div class="row">
              <div
                class="col-sm-4 col-12 order-sm-first order-last text-center offset-sm-1"
              >
                <div>
                  <img
                    class="rounded-circle my-2"
                    :src="`${business.logo ?? '/media/avatars/blank.png'}`"
                    style="border: 3px solid white; width: 120px; height: 118px; object-fit: cover;"
                  />
                </div>
                <router-link
                  :to="`/business/${business.id}`"
                  type="button"
                  class="btn btn-danger my-sm-2 my-3"
                >
                  View Business
                </router-link>
              </div>

              <div
                class="
                  col-sm-4 col-12
                  order-sm-last order-first
                  text-white text-center
                  my-sm-auto
                  mt-3 offset-sm-1
                "
              >
                <h3 style="color: white !important">{{ business.name }}</h3>
                <p class="overflow-hidden">{{ business.summary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    const businesses = computed(() => store.getters.getBusinesses);
    store.commit(Mutations.SET_TOOLBAR_BUTTON, {
      shouldShow: true,
      title: "Create",
      url: "/create-investment-opportunity",
    });
    onMounted(() => {
      setCurrentPageBreadcrumbs("Businesses", []);
      store.dispatch(Actions.GET_FOUNDER_BUSINESSES, {
        page: 1,
        perPage: 10,
      });
    });
    onBeforeUnmount(() => {
      store.commit(Mutations.SET_TOOLBAR_BUTTON, {
        shouldShow: false,
        title: "",
        url: "",
      });
    });
    return {
      businesses,
    };
  },
});
</script>

<style scoped>
.content {
  padding: 30px 0;
}
</style>