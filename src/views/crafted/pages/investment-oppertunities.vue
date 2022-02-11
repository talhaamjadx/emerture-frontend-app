<template>
  <div
    v-for="oppertunity in investmentOppertunities.founderBusinesses"
    :key="oppertunity.id"
  >
    <div class="container-fluid p-0">
      <div class="row m-3 g-0">
        <div class="col-xl-7 col-12 order-md-first order-last">
          <div class="content" style="background-color: #1b283f">
            <div class="row">
              <div
                class="col-sm-5 col-12 order-sm-first order-last text-center"
              >
                <div>
                  <img
                    class="rounded-circle my-2"
                    :src="`${oppertunity.logo ?? '/media/avatars/blank.png'}`"
                    style="border: 3px solid white; width: 120px; height: 118px"
                  />
                </div>
                <router-link
                  :to="`/investment-oppertunity-profile/${oppertunity.id}`"
                  type="button"
                  class="btn btn-danger my-sm-2 my-3"
                >
                  View Investment Oppertunity
                </router-link>
                <button
                  v-if="!connectedIds[oppertunity.id]"
                  @click="connect(oppertunity.id)"
                  type="button"
                  style="width: 92%"
                  class="btn btn-danger my-sm-2 my-3"
                >
                  Connect
                </button>
                <button
                  v-else
                  disabled
                  type="button"
                  style="width: 92%"
                  class="btn btn-danger my-sm-2 my-3"
                >
                  Connected
                </button>
              </div>

              <div
                class="
                  col-sm-7 col-12
                  order-sm-last order-first
                  text-white text-center
                  my-sm-auto
                  mt-3
                "
              >
                <h3 style="color: white !important">{{ oppertunity.name }}</h3>
                <p>{{ oppertunity.summary }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-12 order-md-last order-first">
          <div class="contnt">
            <img
              :src="`${oppertunity.headerImage}`"
              style="width: 100%; height: 302px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  props: {
    investmentOppertunitiesMain: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const store = useStore();
    const investmentOppertunities = ref<Array<Record<string, unknown>>>([]);
    let connectedIds = ref<Record<string, unknown>>({});
    const connect = async (id) => {
      try {
        const response = await store.dispatch(
          Actions.INVESTMENT_OPPERTUNITY_CONNECT,
          {
            founderBusinessId: id,
          }
        );
        if (response !== true) throw new Error();
        refresh();
        store.commit("setAlert", {
              message: "Success",
              subMessage: "Investment Oppertunity Connected",
              variant: "primary",
              duration: 4000,
              show: true,
            });
      } catch (err) {
        store.commit("setAlert", {
              message: "Error",
              subMessage: "Investment Oppertunity Not Connected",
              variant: "danger",
              duration: 4000,
              show: true,
            });
      }
    };
    const refresh = async () => {
      try {
        const response = await store.dispatch(
          Actions.CONNECTED_INVESTMENT_OPPERTUNITIES
        );
        if (!response.success) throw new Error();
        connectedIds.value = {};
        for (let i = 0; i < response.data.length; i++) {
          connectedIds.value[response.data[i].founderBusinessId] = true;
        }
      } catch (err) {
        //
      }
    };
    onMounted(() => {
      refresh();
    });
    watch(
      () => props.investmentOppertunitiesMain,
      (value) =>
        (investmentOppertunities.value = value as Array<
          Record<string, unknown>
        >)
    );
    return {
      investmentOppertunities,
      connect,
      connectedIds,
    };
  },
});
</script>