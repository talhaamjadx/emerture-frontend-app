<template>
  <!--begin::Wrapper-->
  <div>
    <div
      style="width: 1000px !important"
      class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto"
      v-html="inner"
    ></div>
    <div class="row">
      <div class="col-md-12">
        <button
          :data-kt-indicator="loading ? 'on' : null"
          @click="connect"
          class="btn btn-primary my-3 float-end"
        >
          <span v-if="!loading" class="indicator-label">Accept</span>
          <span class="indicator-progress">
            Please wait...
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span
          ></span>
        </button>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Quill from "quill";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "disclaimer",
  setup() {
    const loading = ref<boolean>(false);
    const store = useStore();
    const route = useRoute();
    let termsAndConditions = { value: "" };
    const inner = ref<string>("");
    const router = useRouter();
    const connect = async (id) => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.INVESTMENT_OPPORTUNITY_CONNECT,
          {
            founderBusinessId: route.params.id,
          }
        );
        if (response !== true) throw new Error();
        loading.value = false;
        store.commit("setAlert", {
          message: "Success",
          subMessage: "Investment Opportunity Connected",
          variant: "primary",
          duration: 4000,
          show: true,
        });
        setTimeout(() => {
          router.push("/find-investment-opportunities");
        }, 2000);
      } catch (err) {
        loading.value = false;
        store.commit("setAlert", {
          message: "Error",
          subMessage: "Investment Opportunity Not Connected",
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_CONFIGURATION_BY_KEY,
          "disclaimer"
        );
        if (!response.success) throw new Error();
        termsAndConditions = response.data;
        let article = document.createElement("article");
        let quill = new Quill(article, { readOny: true });
        quill.setContents(JSON.parse(termsAndConditions.value));
        inner.value = quill.root.innerHTML;
      } catch (err) {
        console.log(err);
      }
    });
    return {
      loading,
      inner,
      connect,
    };
  },
});
</script>
