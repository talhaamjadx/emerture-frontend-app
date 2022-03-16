<template>
  <div>
    <button
      disabled
      :data-kt-indicator="loading ? 'on' : null"
      ref="submitButton"
      id="kt_sign_in_submit"
      :class="`btn btn-lg btn-${success ? 'primary' : 'danger'} w-100 mb-5`"
    >
      <span v-if="!loading" class="indicator-label">
        {{ success ? "Success" : "Error" }}
      </span>

      <span v-if="loading" class="indicator-progress">
        Please wait...
        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  setup() {
    const loading = ref<boolean>(true);
    const success = ref<boolean>(false);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.UPDATE_FOUNDER_REQUISITE_EXPERT_STATUS,
          {
            id: route.query.id,
            status: route.query.status,
          }
        );
        loading.value = false;
        if (!response?.success) throw new Error(response?.data?.message);
        success.value = true;
        store.commit("setAlert", {
          message: "Success",
          subMessage: response?.message,
          variant: "primary",
          duration: 4000,
          show: true,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err) {
        store.commit("setAlert", {
          message: "Error",
          subMessage: err,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    });
    return {
      loading,
      success,
    };
  },
});
</script>