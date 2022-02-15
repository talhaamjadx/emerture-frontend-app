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
          @input="addToIndustrySectors($event)"
          :checked="checkedIndustrySectors[is.id]"
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
import { defineComponent, ref, onMounted, computed, reactive, watch } from "vue";
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
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    let tempBusinessDraft = { ...businessDraft.value };
    const checkedIndustrySectors = reactive<Record<string, boolean>>({})
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
      const temp = [...(businessDraft.value?.industrySectors ?? [])]
      selectedIndustrySectors.value = temp.length ? [...temp] : [...selectedIndustrySectors.value]
      for(let i = 0; i < (businessDraft.value?.industrySectors?.length ?? 0); i++){
        checkedIndustrySectors[businessDraft.value?.industrySectors[i]] = true
      }
    });
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    const fieldChanged = async () => {
      tempBusinessDraft["industrySectors"] = selectedIndustrySectors.value;
      if (formData.value.get("industrySectors")) {
        formData.value.set(
          "industrySectors",
          JSON.stringify(selectedIndustrySectors.value)
        );
      } else
        formData.value.append(
          "industrySectors",
          JSON.stringify(selectedIndustrySectors.value)
        );
      emit("form-data", formData.value);
      try {
        const res = await store.dispatch(Actions.CREATE_BUSINESS_DRAFT, {
          business: JSON.stringify(tempBusinessDraft),
        });
        if (res !== true) throw new Error("error in API");
        store.dispatch(Actions.GET_BUSINESS_DRAFT);
      } catch (err) {
        console.log({ err });
      }
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
    onMounted(async () => {
      if (!industrySectors.value.length)
        await store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });
    return {
      formData,
      fieldChanged,
      industrySectors,
      addToIndustrySectors,
      selectedIndustrySectors,
      checkedIndustrySectors
    };
  },
});
</script>
