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
      <label class="form-label">Areas of Expertise</label>
      <!--end::Label-->

      <div
        v-for="e in expertise"
        :key="e.id"
        class="form-check form-check-custom form-check-solid my-3"
      >
        <input
          :checked="isSelected('expertise', e.id)"
          @input="addToExpertise($event)"
          class="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          :data-id="e.id"
        />
        <label class="form-check-label" for="flexCheckDefault">
          {{ e.name }}
        </label>
      </div>
      <!--end::Input-->
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
          :checked="isSelected('industrySectors', is.id)"
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
import { defineComponent, ref, onMounted, computed, watch, inject } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

interface ExpertiseInterface {
  id: number;
}
interface IndustrySectorsInterface {
  id: number;
}

export default defineComponent({
  name: "ProfessionalSummary",
  components: {},
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const expertise = computed(() => store.getters.expertiseGetter);
    const industrySectors = computed(() => store.getters.industrySectorsGetter);
    const formData = ref<FormData>(props.formDataTemp);
    const selectedExpertise = ref<Array<number>>([]);
    const selectedIndustrySectors = ref<Array<number>>([]);
    const expertProfile = inject("expertProfile");
    const fetchData = (value) => {
      for (
        let i = 0;
        i < (value.expertise as Array<ExpertiseInterface>).length;
        i++
      ) {
        selectedExpertise.value = [
          ...selectedExpertise.value,
          (value.expertise as Array<ExpertiseInterface>)[i].id,
        ];
      }
      for (
        let i = 0;
        i < (value.industrySectors as Array<IndustrySectorsInterface>).length;
        i++
      ) {
        selectedIndustrySectors.value = [
          ...selectedIndustrySectors.value,
          (value.industrySectors as Array<IndustrySectorsInterface>)[i].id,
        ];
      }
    };
    watch(expertProfile as Record<string, unknown>, (value) => {
      fetchData(value);
    });
    if ((expertProfile as Record<string, unknown>).value)
      fetchData((expertProfile as Record<string, unknown>).value);
    const fieldChanged = (event) => {
      if (formData.value.get(event.target.name)) {
        formData.value.set(
          event.target.name,
          JSON.stringify(event.target.value)
        );
      } else
        formData.value.append(
          event.target.name,
          JSON.stringify(event.target.value)
        );
      emit("form-data", formData.value);
    };
    const isSelected = (name, id) => {
      if (name == "expertise") {
        return selectedExpertise.value.find((e) => e == id);
      } else if (name == "industrySectors") {
        return selectedIndustrySectors.value.find((is) => is == id);
      }
    };
    const addToExpertise = (event) => {
      if (event.target.checked) {
        selectedExpertise.value = [
          ...selectedExpertise.value,
          event.target.dataset["id"],
        ];
      } else {
        selectedExpertise.value = selectedExpertise.value.filter((e) => {
          return e != event.target.dataset["id"];
        });
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
    };
    watch(selectedExpertise, (value) => {
      const event = {
        target: {
          name: "expertExpertise",
          value: value,
        },
      };
      fieldChanged(event);
    });
    watch(selectedIndustrySectors, (value) => {
      const event = {
        target: {
          name: "expertIndustrySectors",
          value: value,
        },
      };
      fieldChanged(event);
    });
    onMounted(() => {
      if (!expertise.value.length) store.dispatch(Actions.GET_EXPERTISE);
      if (!industrySectors.value.length)
        store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });
    return {
      isSelected,
      formData,
      fieldChanged,
      expertise,
      industrySectors,
      addToExpertise,
      addToIndustrySectors,
      selectedExpertise,
      selectedIndustrySectors,
    };
  },
});
</script>
