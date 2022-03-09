<template>
  <!--begin::List Widget 6-->
  <div class="container mt-4">
    <section v-for="round in rounds" :key="round.id" class="border rounded-5">
      <div class="row mt-3 mb-1 px-3">
        <div class="col">
          <strong
            ><span>{{ round.name }}</span></strong
          >
        </div>
        <div class="col text-end fa">
          <router-link
            class="w-un"
            :to="`/view-funding-round/${round.id}?businessId=${round.businessId}`"
          >
            <span><i class="fa fa-eye px-2" aria-hidden="true"></i></span>
          </router-link>
          <router-link
            class="w-un"
            :to="`/update-funding-round/${round.id}?businessId=${round.businessId}`"
          >
            <span><i class="fa fa-edit px-2" aria-hidden="true"></i></span
          ></router-link>
          <a
            data-bs-toggle="modal"
            :data-bs-target="`#kt_modal_delete_round_${round.id}`"
            class="w-un"
            href="javascript:void(0)"
          >
            <span><i class="fa fa-trash px-2" aria-hidden="true"></i></span
          ></a>
        </div>
      </div>
      <hr style="width: 98%; margin: 6px auto" />

      <div class="row mt-4 mb-2 mx-1">
        <div class="col">
          <span
            ><i class="fa fa-calendar calender-green" aria-hidden="true"></i>
            Opens {{ formatDate(round.opensAt) }}</span
          >
        </div>
        <div class="col text-end">
          <span
            ><i class="fa fa-calendar calender-red" aria-hidden="true"></i>
            closes {{ formatDate(round.closesAt) }}</span
          >
        </div>
      </div>

      <div class="card" :class="widgetClasses">
        <div class="card-body pt-0">
          <div class="my-5">
            <!--begin::Item-->
            <div
              :class="['mb-7', `bg-light-info`]"
              class="d-flex align-items-center rounded p-5 mb-7"
            >
              <!--begin::Icon-->
              <span :class="`svg-icon-info`" class="svg-icon me-5">
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Title-->
              <div class="flex-grow-1 me-2">
                <a
                  href="#"
                  class="fw-bolder text-gray-800 text-hover-primary fs-6"
                  >Funding Required</a
                >
              </div>
              <!--end::Title-->

              <!--begin::Lable-->
              <span :class="`text-info`" class="fw-bolder py-1">{{
                formatter(round.investment_required, "GBP")
              }}</span>
              <!--end::Lable-->
            </div>
            <!--end::Item-->
          </div>
          <div>
            <!--begin::Item-->
            <div
              :class="['mb-7', `bg-light-info`]"
              class="d-flex align-items-center rounded p-5 mb-7"
            >
              <!--begin::Icon-->
              <span :class="`svg-icon-info`" class="svg-icon me-5">
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Title-->
              <div class="flex-grow-1 me-2">
                <a
                  href="#"
                  class="fw-bolder text-gray-800 text-hover-primary fs-6"
                  >Pre-Money Valuation</a
                >
              </div>
              <!--end::Title-->

              <!--begin::Lable-->
              <span :class="`text-info`" class="fw-bolder py-1">{{
                formatter(round.preMoneyValuation, "GBP")
              }}</span>
              <!--end::Lable-->
            </div>
            <!--end::Item-->
          </div>
          <div>
            <!--begin::Item-->
            <div
              :class="['mb-7', `bg-light-info`]"
              class="d-flex align-items-center rounded p-5 mb-7"
            >
              <!--begin::Icon-->
              <span :class="`svg-icon-info`" class="svg-icon me-5">
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Title-->
              <div class="flex-grow-1 me-2">
                <a
                  href="#"
                  class="fw-bolder text-gray-800 text-hover-primary fs-6"
                  >Minimum Investment</a
                >
              </div>
              <!--end::Title-->

              <!--begin::Lable-->
              <span :class="`text-info`" class="fw-bolder py-1">{{
                formatter(round.minimumInvestment, "GBP")
              }}</span>
              <!--end::Lable-->
            </div>
            <!--end::Item-->
          </div>
          <div>
            <!--begin::Item-->
            <div
              :class="['mb-7', `bg-light-info`]"
              class="d-flex align-items-center rounded p-5 mb-7"
            >
              <!--begin::Icon-->
              <span :class="`svg-icon-info`" class="svg-icon me-5">
                <span class="svg-icon svg-icon-1">
                  <inline-svg src="media/icons/duotune/abstract/abs027.svg" />
                </span>
              </span>
              <!--end::Icon-->

              <!--begin::Title-->
              <div class="flex-grow-1 me-2">
                <a
                  href="#"
                  class="fw-bolder text-gray-800 text-hover-primary fs-6"
                  >Total Investment</a
                >
              </div>
              <!--end::Title-->

              <!--begin::Lable-->
              <span :class="`text-info`" class="fw-bolder py-1">{{
                formatter(round?.totalInvestment, "GBP")
              }}</span>
              <!--end::Lable-->
            </div>
            <!--end::Item-->
          </div>
          <div>
            <div class="row my-3"><h3>Investment History</h3></div>
            <div class="row mb-7">
              <!--begin::Col-->
              <InvestmentHistory
                v-if="round?.fundingRoundInvestments?.length ?? false"
                :investments="round?.fundingRoundInvestments ?? []"
                :currencyCode="
                  currencyCodeSymbolEnums[business?.currencyCode ?? 'pound']
                "
              />
              <div v-else class="d-flex justify-content-center">No Entries</div>
              <!--end::Col-->
            </div>
          </div>
        </div>
        <!--end::Body-->
      </div>
      <div class="row mt-4 mb-3 pr-3">
        <div class="col text-end mx-3">
          <span
            :style="
              round?.status == 1
                ? 'background-color: green; color: white'
                : round?.status == 2
                ? 'background-color: red; color: white'
                : ''
            "
            class="text-royalblue py-1 px-2 rounded-5 font-weight-bold"
            >{{
              round?.status == 0
                ? "Awaiting Approval"
                : round?.status == 1
                ? "Approved"
                : "Rejected"
            }}</span
          >
        </div>
      </div>
      <DeleteFundingRoundModal
        @round-deleted="roundDeleted"
        :businessId="round.businessId"
        :id="round.id"
      />
    </section>
  </div>
  <!--end::List Widget 6-->
</template>

<script lang="ts">
import DeleteFundingRoundModal from "@/components/modals/forms/DeleteFundingRoundModal.vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { mainFormatter } from "@/utils/index";
import moment from "moment";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";
import InvestmentHistory from "@/components/widgets/lists/Widget5.vue";

export default defineComponent({
  name: "funding-rounds",
  props: {
    widgetClasses: String,
  },
  components: {
    DeleteFundingRoundModal,
    InvestmentHistory,
  },
  setup(props) {
    const currencyCodeSymbolEnums = {
      dollar: "$",
      pound: "£",
      euro: "€",
    };
    const route = useRoute();
    const store = useStore();
    const rounds = ref<Array<Record<string, unknown>>>([]);
    const businessId = ref<string>(route.params.id as string);
    const refresh = async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_FUNDING_ROUNDS,
          businessId.value
        );
        if (response instanceof Array) {
          rounds.value = response;
        }
      } catch (err) {
        //
      }
    };
    onMounted(() => {
      refresh();
    });
    const roundDeleted = () => {
      refresh();
    };
    const formatDate = (date) => moment(date).format("YYYY-MM-DD");
    const formatter = computed(() => mainFormatter);
    return {
      currencyCodeSymbolEnums,
      rounds,
      formatter,
      formatDate,
      roundDeleted,
    };
  },
});
</script>

<style scoped>
.bg-darkorange {
  background-color: #ff8c04;
}
.rounded-3 {
  border-radius: 6px !important;
}
.rounded-3:hover {
  background-color: rgb(204, 62, 62);
}
.fa {
  font-size: 20px !important;
}
.fa-eye {
  color: green;
}
.fa-pencil-square-o {
  color: orange;
}
.fa-trash-o {
  color: red;
}
.calender-green {
  color: #10b981;
}
.calender-red {
  color: red;
}
.bg-lavender {
  background-color: #eaeaea;
}
.w-un:hover {
  text-decoration: none;
}
.cl-grey {
  color: grey;
  font-weight: 600;
}
.cl-drb {
  font-size: 21px;
  font-weight: 500;
}
.rounded-5 {
  border-radius: 7px;
}
.text-royalblue {
  color: #3d58c4;
  background-color: #bfdbfe;
  font-size: 0.75rem;
}
.rounded-5 {
  border-radius: 15px;
}
</style>