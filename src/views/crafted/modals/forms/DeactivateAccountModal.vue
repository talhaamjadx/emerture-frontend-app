<template>
  <!--begin::Modal - New Target-->
  <div
    class="modal fade"
    :id="`kt_modal_deactivate`"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
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
          <!--begin:Form-->
          <el-form
            id="kt_modal_new_target_form"
            @submit.prevent="submit()"
            :model="targetData"
            :rules="rules"
            ref="formRef"
            class="form"
          >
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">Do you want to deactivate your account?</h1>
            </div>

            <!--begin::Actions-->
            <div class="text-center">
              <button
                type="reset"
                id="kt_modal_new_target_cancel"
                class="btn btn-white me-3"
              >
                Cancel
              </button>

              <!--begin::Button-->
              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label">
                  Delete
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <inline-svg src="icons/duotune/arrows/arr064.svg" />
                  </span>
                </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Actions-->
          </el-form>
          <!--end:Form-->
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

interface NewAddressData {
  targetTitle: string;
  assign: string;
  dueDate: string;
  targetDetails: string;
  tags: Array<string>;
}

export default defineComponent({
  name: "new-target-modal",
  components: {},
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);

    const targetData = ref<NewAddressData>({
      targetTitle: "",
      assign: "",
      dueDate: "",
      targetDetails: "",
      tags: ["important", "urgent"],
    });

    const rules = ref({
      targetTitle: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
      assign: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      dueDate: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
      tags: [
        {
          required: true,
          message: "Please select Activity zone",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const response = await store.dispatch(Actions.DEACTIVATE);
            if (response !== true) throw new Error("API error");
            store.commit("setAlert", {
              message: "Success",
              subMessage: "Account deactivated!",
              variant: "primary",
              duration: 4000,
              show: true,
            });
            localStorage.removeItem("access_token");
            router.push("/sign-in");
          } catch (err) {
            store.commit("setAlert", {
              message: "Error",
              subMessage: "Error in deactivation",
              variant: "danger",
              duration: 4000,
              show: true,
            });
          }
        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
    };

    return {
      targetData,
      submit,
      loading,
      formRef,
      rules,
      newTargetModalRef,
    };
  },
});
</script>
