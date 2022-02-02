<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="accordion" id="kt_accordion_1">
          <div class="accordion-item">
            <h2 class="accordion-header" id="kt_accordion_1_header_1">
              <button
                class="accordion-button fs-4 fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#kt_accordion_1_body_1"
                aria-expanded="true"
                aria-controls="kt_accordion_1_body_1"
              >
                Areas of Expertise
              </button>
            </h2>
            <div
              id="kt_accordion_1_body_1"
              class="accordion-collapse collapse show"
              aria-labelledby="kt_accordion_1_header_1"
              data-bs-parent="#kt_accordion_1"
            >
              <div class="accordion-body">
                <div
                  v-for="e in expertise"
                  :key="e.id"
                  class="form-check form-check-custom form-check-solid my-3"
                >
                  <input
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
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="kt_accordion_1_header_2">
              <button
                class="accordion-button fs-4 fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#kt_accordion_1_body_2"
                aria-expanded="false"
                aria-controls="kt_accordion_1_body_2"
              >
                Industry Sectors
              </button>
            </h2>
            <div
              id="kt_accordion_1_body_2"
              class="accordion-collapse collapse"
              aria-labelledby="kt_accordion_1_header_2"
              data-bs-parent="#kt_accordion_1"
            >
              <div class="accordion-body">
                <div
                  v-for="is in industrySectors"
                  :key="is.id"
                  class="form-check form-check-custom form-check-solid my-3"
                >
                  <input
                    @input="addToIndustrySectors($event)"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    :data-id="is.id"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {{ is.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="showError" style="color: red">
          Select Atleast One To Find Experts
        </p>
        <div class="mt-8">
          <button @click="findExperts" class="btn btn-primary float-end">
            Find Experts
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="expert in filteredExperts"
        :key="expert.id"
        class="col-md-4 my-4"
      >
        <ExpertDetailsCard
          :name="expert.name"
          :jobTitle="expert.jobTitle"
          :profilePicture="expert.user.profileImage"
          :linkedInProfile="expert.linkedInProfileUrl"
          :introduction="expert.introduction"
          :online="true"
          :expertId="expert.id"
          avatar="media/avatars/150-12.jpg"
          :connected="false"
          avg-earnings="$14,560"
          total-sales="$236,400"
          :isAlreadyConnected="isAlreadyConnected(expert.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watchEffect } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ExpertDetailsCard from "@/components/cards/ExpertDetailsCard.vue";
import objectPath from "object-path";

export default defineComponent({
  name: "find-experts",
  components: {
    ExpertDetailsCard,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const founderRequisiteExperts = ref<Array<Record<string, unknown>>>([]);
    watchEffect(() => {
      founderRequisiteExperts.value = user.value.founderRequisiteExpert;
    });
    const isAlreadyConnected = (id) => {
      return founderRequisiteExperts.value.some((expert) => {
        return objectPath.get(expert, "id", false) == id;
      });
    };
    const expertise = computed(() => store.getters.expertiseGetter);
    const industrySectors = computed(() => store.getters.industrySectorsGetter);
    const selectedExpertise = ref<Array<number>>([]);
    const selectedIndustrySectors = ref<Array<number>>([]);
    const filteredExperts = computed(() => store.getters.filteredExpertsGetter);
    const showError = ref<boolean>(false);
    const addToExpertise = (event) => {
      showError.value = false;
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
      showError.value = false;
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
    const findExperts = async () => {
      if (
        !selectedIndustrySectors.value.length ||
        !selectedExpertise.value.length
      ) {
        showError.value = true;
        return;
      }
      try {
        const response = await store.dispatch(Actions.FIND_EXPERTS, {
          industrySectorIds: selectedIndustrySectors.value,
          expertIds: selectedExpertise.value,
        });
        if (response !== true) throw new Error();
      } catch (err) {
        //
      }
    };
    onMounted(async () => {
      setCurrentPageBreadcrumbs("Find Experts", []);
      if (!expertise.value.length) store.dispatch(Actions.GET_EXPERTISE);
      if (!industrySectors.value.length)
        store.dispatch(Actions.GET_INDUSTRY_SECTORS);
    });

    return {
      showError,
      expertise,
      industrySectors,
      addToExpertise,
      addToIndustrySectors,
      findExperts,
      filteredExperts,
      isAlreadyConnected,
    };
  },
});
</script>

<style scoped>
.accordion-button::after {
  background-image: url("../../../../public/media/icons/filter-solid-active.svg");
}
.accordion-button:not(.collapsed)::after {
  transform: none;
  background-image: url("../../../../public/media/icons/filter-solid-collapse.svg");
}
</style>
