<template>
  <div class="row">
    <div
      v-for="expert in founderRequisiteExperts"
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
        :expertId="expert.id+''"
        avatar="media/avatars/blank.png"
        :connected="false"
        avg-earnings="$14,560"
        total-sales="$236,400"
        :fromConnectedExperts="true"
      />
    </div>
    <div v-if="founderRequisiteExperts?.length == 0" class="row d-flex justify-content-center">
        No Connected Experts
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
    onMounted(async () => {
      setCurrentPageBreadcrumbs("Connected Experts", []);
    });

    return {
      founderRequisiteExperts,
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
