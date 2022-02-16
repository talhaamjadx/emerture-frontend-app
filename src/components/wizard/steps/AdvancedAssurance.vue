<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <h2 class="fw-bolder text-dark">Advanced Assurance</h2>
    </div>
    <div class="fv-row mb-10">
      <div
        v-for="(i, index) in advancedAssuranceOptions"
        :key="`as-${index}`"
        class="form-check form-check-custom form-check-solid my-3"
      >
        <input
          @input="fieldChanged($event)"
          v-model="i.value"
          class="form-check-input"
          type="checkbox"
          :name="i.name"
          id="flexCheckDefault"
          :checked="isChecked(i.name)"
        />
        <label class="form-check-label" for="flexCheckDefault">
          {{ enums[i.name] }}
        </label>
      </div>
    </div>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  ref,
  onMounted,
  computed,
} from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "investment-ticket-size",
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const formData = ref<FormData>(props.formDataTemp);
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    let tempBusinessDraft = { ...businessDraft.value };
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
    });
    const advancedAssuranceOptions = reactive([
      { name: "advanceAssuranceSeis", value: false },
      { name: "advanceAssuranceEis", value: false },
      { name: "advanceAssuranceAppliedFor", value: false },
    ]);
    onMounted(() => {
      for (let i = 0; i < advancedAssuranceOptions.length; i++) {
        if (!formData.value.has(advancedAssuranceOptions[i].name))
          formData.value.append(advancedAssuranceOptions[i].name, "0");
      }
    });
    watch(
      () => props.formDataTemp,
      () => {
        formData.value = props.formDataTemp;
      }
    );
    const isChecked = (name) => {
      try {
        return businessDraft.value[name] ? true : false;
      } catch (err) {
        return false;
      }
    };
    const fieldChanged = async (event) => {
      tempBusinessDraft[event.target.name] = event.target.checked ? "1" : "0";
      if (formData.value.has(event.target.name))
        formData.value.set(event.target.name, event.target.checked ? "1" : "0");
      else
        formData.value.append(
          event.target.name,
          event.target.checked ? "1" : "0"
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
    const enums = reactive({
      advanceAssuranceSeis: "SEIS",
      advanceAssuranceEis: "EIS",
      advanceAssuranceAppliedFor: "Applied For",
    });
    return {
      formData,
      fieldChanged,
      advancedAssuranceOptions,
      enums,
      isChecked,
    };
  },
});
</script>
