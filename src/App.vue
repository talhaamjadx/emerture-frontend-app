<template>
  <div
    v-if="alert.show"
    class="row justify-content-end mt-5 pt-5"
    style="z-index: 999"
  >
    <div class="col-md-4">
      <div
        style="width: 31%"
        :class="`
          alert alert-${alert.variant}
          d-flex
          align-items-center
          p-5
          mb-10
          position-fixed
          mx-3
        `"
      >
        <span :class="`svg-icon svg-icon-2hx svg-icon-${alert.variant} me-4`">
          <inline-svg :src="`media/icons/duotune/general/gen0${alert.variant == 'primary' ? '48' : '50'}.svg`" />
        </span>
        <div class="d-flex flex-column">
          <h4 :class="`mb-1 text-${alert.variant}`">{{ alert.message }}</h4>
          <span>{{ alert.subMessage }}</span>
        </div>
        <button
          type="button"
          class="
            position-absolute position-sm-relative
            m-2 m-sm-0
            top-0
            end-0
            btn btn-icon
            ms-sm-auto
          "
          data-bs-dismiss="alert"
        >
          <i class="bi bi-x fs-1 text-primary"></i>
        </button>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { Mutations } from "@/store/enums/StoreEnums";
import { initializeComponents } from "@/core/plugins/keenthemes";

export default defineComponent({
  name: "app",
  setup() {
    const store = useStore();
    const alert = computed(() => store.getters.getAlert);
    watch(
      () => alert.value.show,
      (val) => {
        if (val === true) {
          setTimeout(() => {
            store.commit("setAlert", {
              message: "",
              subMessage: "",
              variant: "primary",
              duration: "",
              show: false,
            });
          }, alert.value.duration);
        }
      }
    );
    onMounted(() => {
      /**
       * this is to override the layout config using saved data from localStorage
       * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
       */
      store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);

      nextTick(() => {
        initializeComponents();
      });
    });
    return{
      alert
    }
  },
});
</script>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~apexcharts/dist/apexcharts.css";
@import "~quill/dist/quill.snow.css";
@import "~animate.css";
@import "~sweetalert2/dist/sweetalert2.css";
@import "~nouislider/distribute/nouislider.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~socicon/css/socicon.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "~dropzone/dist/dropzone.css";
@import "~@vueform/multiselect/themes/default.css";
@import "~prism-themes/themes/prism-shades-of-purple.css";
@import "~element-plus/dist/index.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";

// Dark mode demo style scss
//@import "assets/sass/plugins.dark";
//@import "assets/sass/style.dark";

//RTL version styles
//@import "assets/css/style.rtl.css";
</style>
