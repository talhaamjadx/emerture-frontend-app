<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Key Skills</h2>
    </div>
    <div class="fv-row mb-10">
      <!--end::Label-->
      <label class="form-label">Industry Sectors</label>
      <!--end::Label-->

      <div
        v-for="is in industrySectors"
        :key="is.id"
        class="form-check form-check-custom form-check-solid my-3"
      >
        <input
          :checked="isSelected(is.id)"
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
          :data-id="is.id"
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
import {
  defineComponent,
  ref,
  onMounted,
  computed,
    inject,
    watch,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

interface IndustrySectorsInterface {
  id: number;
}

export default defineComponent({
  name: "IndustrySectors",
  components: {},
  props: {
    formDataTemp: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const industrySectors = computed(() => store.getters.industrySectorsGetter);
    let formData = ref<Record<string, unknown>>(props.formDataTemp);
    let selectedIndustrySectors = ref<Array<number>>([]);
    const investorProfile = inject("investorProfile");
    watch(() => props.formDataTemp, () => {
      formData.value = props.formDataTemp
    })
    watch(investorProfile as Record<string, unknown>, (value) => {
      for(let i = 0; i < (value.industrySectors as Array<IndustrySectorsInterface>).length; i++){
        selectedIndustrySectors.value = [...selectedIndustrySectors.value, (value.industrySectors as Array<IndustrySectorsInterface>)[i].id]
      }
    });
    const fieldChanged = () => {
      formData.value["industrySectors"] = selectedIndustrySectors.value
      emit("form-data", formData.value);
    };
    const isSelected = (id) => {
      return selectedIndustrySectors.value.find((is) => is == id);
    };
    const addToIndustrySectors = (event) => {
      if (event.target.checked) {
        selectedIndustrySectors.value = [
          ...selectedIndustrySectors.value,
          event.target.dataset["id"],
        ];
      } else {
        selectedIndustrySectors.value = selectedIndustrySectors.value.filter((i) => {
          return i != event.target.dataset["id"];
        });
      }
      fieldChanged()
    };
    onMounted(() => {
      if (!industrySectors.value.length)
        store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });
    return {
      isSelected,
      formData,
      fieldChanged,
      industrySectors,
      addToIndustrySectors,
      selectedIndustrySectors,
    };
  },
});
</script>
