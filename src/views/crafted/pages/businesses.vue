<template>
  <div v-for="business in businesses.founderBusinesses" :key="business.id">
    <div class="container-fluid p-0">
      <div class="row m-3 g-0">
        <div class="col-xl-7 col-12 order-md-first order-last">
          <div class="content" style="background-color: #1b283f">
            <div class="row">
              <div
                class="col-sm-5 col-12 order-sm-first order-last text-center"
              >
                <div>
                  <img
                    class="rounded-circle my-2"
                    :src="`${ business.logo ?? '/media/avatars/blank.png' }`"
                    width="120px"
                    height="100px"
                    style="border: 3px solid white; width: 120px; height:100px"
                  />
                </div>
                <router-link :to="`/business/${business.id}`" type="button" class="btn btn-danger my-sm-2 my-3">
                  View Business
                </router-link>
              </div>

              <div
                class="
                  col-sm-7 col-12
                  order-sm-last order-first
                  text-white text-center
                  my-sm-auto
                  mt-3
                "
              >
                <h3 style="color: white !important">Preston Internation</h3>
                <p>Summary</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-12 order-md-last order-first">
          <div class="contnt">
            <img
              :src="`${business.headerImage}`"
              style="width: 100%; height: 229px"
            />
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
      url: "/create-investment-oppertunity",
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
