<template>
  <!--begin::Modal - New Target-->
  <div
    class="modal fade"
    :id="`kt_modal_delete_round_disclaimer_${id}`"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content rounded" style="max-height: 500px;">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <div>
            <div
              class="w-lg-500px bg-white p-10 p-lg-15 mx-auto"
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
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - New Target-->
</template>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Quill from "quill";

export default defineComponent({
  name: "delete-funding-round-modal",
  components: {},
  props: {
    businessId: {
      required: true,
      type: Number,
    }
  },
  setup(props, { emit }) {
    let termsAndConditions = { value: "" };
    const inner = ref<string>("");
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const id = ref<string | number>(props.businessId)
    watch(() => props.businessId, value => id.value = value)
    const connect = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.INVESTMENT_OPPORTUNITY_CONNECT,
          {
            founderBusinessId: props.businessId,
          }
        );
        if (response !== true) throw new Error();
        loading.value = false;
        emit("connected")
        store.commit("setAlert", {
          message: "Success",
          subMessage: "Investment Opportunity Connected",
          variant: "primary",
          duration: 4000,
          show: true,
        });
        hideModal(newTargetModalRef.value);
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
      connect,
      loading,
      formRef,
      newTargetModalRef,
      inner,
      id
    };
  },
});
</script>

<style scoped>
.mw-900px{
    max-width: 750px !important;
}
</style>
