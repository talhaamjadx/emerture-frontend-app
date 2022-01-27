<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Industry Sectors</h2>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <!--end::Label-->

      <div
        v-for="is in industrySectors"
        :key="is.id"
        class="form-check form-check-custom form-check-solid my-3"
      >
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          :data-id="is.id"
          :checked="isChecked(is.id)"
          @input="addToIndustrySectors($event)"
        />
        <label class="form-check-label" for="flexCheckDefault">
          {{ is.name }}
        </label>
      </div>
      <!--end::Input-->
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, inject, watch } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "IndustrySectors",
  components: {},
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const industrySectors = computed(() => store.getters.industrySectorsGetter);
    let formData = ref<FormData>(props.formDataTemp);
    let selectedIndustrySectors = ref<Array<number>>([]);
    const isChecked = (id) => {
      return selectedIndustrySectors.value.some((sector) => sector == id);
    };
    const business = inject("business");
    watch(business as Record<string, unknown>, (value) => {
      if (value.industrySectors) {
        selectedIndustrySectors.value = [
          ...((value.industrySectors as Array<Record<string, unknown>>).map(
            (sector) => sector.id
          ) as Array<number>),
        ];
      }
    });
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    const fieldChanged = () => {
      if (formData.value.get("industrySectors")) {
        formData.value.set(
          "industrySectors",
          JSON.stringify(selectedIndustrySectors.value)
        );
      } else {
        formData.value.append(
          "industrySectors",
          JSON.stringify(selectedIndustrySectors.value)
        );
      }
      emit("form-data", formData.value);
    };
    const addToIndustrySectors = (event) => {
      if (event.target.checked) {
        selectedIndustrySectors.value = [
          ...selectedIndustrySectors.value,
          event.target.dataset["id"],
        ];
      } else {
        selectedIndustrySectors.value = selectedIndustrySectors.value.filter(
          (i) => {
            return i != event.target.dataset["id"];
          }
        );
      }
      fieldChanged();
    };
    onMounted(() => {
      if (!industrySectors.value.length)
        store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });
    return {
      formData,
      fieldChanged,
      industrySectors,
      addToIndustrySectors,
      isChecked,
    };
  },
});
</script>
