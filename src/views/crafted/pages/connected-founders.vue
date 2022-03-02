<template>
  <div class="row">
    <div
      v-for="founder in connectedFounders"
      :key="founder.id"
      class="col-md-4 my-4"
    >
      <FounderDetailsCard
        :name="founder.firstName + ' ' + founder.lastName"
        :jobTitle="founder.jobTitle"
        :profilePicture="founder?.profileImage"
        :linkedInProfile="founder.linkedInProfileUrl"
        :introduction="founder.introduction"
        :online="true"
        :founderId="founder.id + ''"
        avatar="media/avatars/blank.png"
        :connected="false"
        avg-earnings="$14,560"
        total-sales="$236,400"
        :fromConnectedExperts="true"
      />
    </div>
    <div
      v-if="connectedFounders?.length == 0"
      class="row d-flex justify-content-center"
    >
      No Connected Founders
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import FounderDetailsCard from "@/components/cards/FounderDetailsCard.vue";

export default defineComponent({
  name: "connected-founders",
  components: {
    FounderDetailsCard,
  },
  setup() {
    const store = useStore();
    const connectedFounders = computed(
      () => store.getters.connectedFoundersGetter
    );
    onMounted(async () => {
      try {
        const response = await store.dispatch(Actions.CONNECTED_FOUNDERS);
        if (!response?.success)
          throw new Error(response?.data?.message ?? "Something went wrong");
      } catch (err) {
        store.commit("setAlert", {
          message: "Error",
          subMessage: err,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
      setCurrentPageBreadcrumbs("Connected Founders", []);
    });

    return {
      connectedFounders,
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
