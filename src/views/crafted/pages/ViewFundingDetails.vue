<template>
  <div>
    <div v-if="fundingRoundExists" class="container mt-4">
      <section class="border rounded-5">
        <div class="row mt-3 mb-1 px-3">
          <div class="col">
            <strong
              ><span>{{ fundingRound.name }}</span></strong
            >
          </div>
        </div>
        <hr style="width: 98%; margin: 6px auto" />

        <div class="row mt-4 mb-2 mx-1">
          <div class="col">
            <span
              ><i class="fa fa-calendar calender-green" aria-hidden="true"></i>
              Opens {{ formatDate(fundingRound.opensAt) }}</span
            >
          </div>
          <div class="col text-end">
            <span
              ><i class="fa fa-calendar calender-red" aria-hidden="true"></i>
              closes {{ formatDate(fundingRound.closesAt) }}</span
            >
          </div>
        </div>

        <div class="card">
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
                  formatter(
                    fundingRound.investment_required,
                    currencyCodeEnums[op.get(business, "currencyCode", "pound")]
                  )
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
                  formatter(
                    fundingRound.preMoneyValuation,
                    currencyCodeEnums[op.get(business, "currencyCode", "pound")]
                  )
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
                  formatter(
                    fundingRound.minimumInvestment,
                    currencyCodeEnums[op.get(business, "currencyCode", "pound")]
                  )
                }}</span>
                <!--end::Lable-->
              </div>
              <!--end::Item-->
            </div>
          </div>
          <!--end::Body-->
        </div>
        <div class="row mt-4 mb-3 pr-3">
          <div class="col"></div>
          <div class="col text-end">
            <span
              :style="
                fundingRound?.status == 1
                  ? 'background-color: green; color: white'
                  : fundingRound?.status == 2
                  ? 'background-color: red; color: white'
                  : ''
              "
              class="text-royalblue py-1 px-2 rounded-5 font-weight-bold"
              >{{
                fundingRound?.status == 0
                  ? "Awaiting Approval"
                  : fundingRound?.status == 1
                  ? "Approved"
                  : "Rejected"
              }}</span
            >
          </div>
        </div>
      </section>
      <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div class="card-body p-9">
          <div class="row my-3"><h3>Investment History</h3></div>
          <div class="row mb-7">
            <!--begin::Col-->
            <InvestmentHistory
              v-if="fundingRound?.fundingRoundInvestments?.length ?? false"
              :investments="fundingRound?.fundingRoundInvestments ?? []"
              :currencyCode="
                currencyCodeSymbolEnums[business?.currencyCode ?? 'pound']
              "
            />
            <div v-else class="d-flex justify-content-center">No Entries</div>
            <!--end::Col-->
          </div>
        </div>
      </div>
      <div
        v-if="fundingRound?.status == 1"
        class="card mb-5 mb-xl-10"
        id="kt_profile_details_view"
      >
        <div class="card-body p-9">
          <div class="row my-3"><h3>Investment Secured On This Round</h3></div>
          <div class="row mb-7">
            <!--begin::Col-->
            <div class="col-md-12">
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <label class="form-label required">Add Investment</label>
                <el-input v-model="investmentAmount" placeholder="0.00">
                  <template #prepend>{{
                    currencyCodeSymbolEnums[
                      op.get(business, "currencyCode", "pound")
                    ]
                  }}</template>
                  <template #append>{{
                    currencyCodeEnums[op.get(business, "currencyCode", "pound")]
                  }}</template>
                </el-input>
              </div>
            </div>
          </div>
          <button
            :data-kt-indicator="loading ? 'on' : null"
            @click="createInvestment"
            class="btn btn-primary float-end"
          >
            <span v-if="!loading" class="indicator-label">Save</span>
            <span class="indicator-progress">
              Please wait...
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span
            ></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRoute } from "vue-router";
import { mainFormatter } from "@/utils/index";
import moment from "moment";
import objectPath from "object-path";
import InvestmentHistory from "@/components/widgets/lists/Widget5.vue";

export default defineComponent({
  name: "view-funding-round",
  components: {
    InvestmentHistory,
  },
  setup() {
    const loading = ref<boolean>(false);
    const store = useStore();
    const route = useRoute();
    const business = ref<Record<string, unknown>>({});
    const businesses = computed(() => store.getters.getBusinesses);
    const investmentAmount = ref<string>("");
    const fundingRound = ref<Record<string, unknown>>({});
    const op = computed(() => objectPath);
    const currencyCodeSymbolEnums = {
      dollar: "$",
      pound: "£",
      euro: "€",
    };
    const currencyCodeEnums = {
      dollar: "USD",
      pound: "GBP",
      euro: "EUR",
    };
    const fundingRoundExists = computed(() =>
      Object.keys(fundingRound.value).length ? true : false
    );
    const createInvestment = async () => {
      loading.value = true;
      try {
        const response = await store.dispatch(
          Actions.CREATE_FUNDING_ROUND_INVESTMENT,
          {
            fundingRoundId: route.params.id,
            investment: investmentAmount.value,
            businessId: route.query.businessId,
          }
        );
        if (!response?.success) throw new Error(response?.data?.message);
        investmentAmount.value = "";
        await refresh();
        loading.value = false;
        store.commit("setAlert", {
          message: "Success",
          subMessage: "Investment Created",
          variant: "primary",
          duration: 4000,
          show: true,
        });
      } catch (err) {
        loading.value = false;
        store.commit("setAlert", {
          message: "Error",
          subMessage: err,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };
    const formatDate = (date) => moment(date).format("YYYY-MM-DD");
    const formatter = computed(() => mainFormatter);
    const refresh = async () => {
      return new Promise((resolve, reject) => {
        store
          .dispatch(Actions.GET_FOUNDER_BUSINESSES, {
            page: 1,
            perPage: 10,
          })
          .then((response) => {
            if (response !== true) throw new Error();
            business.value = businesses.value?.founderBusinesses.find(
              (b) => b.id == route.query.businessId
            );
            fundingRound.value =
              ((
                business.value?.fundingRounds as Array<Record<string, unknown>>
              )?.find((round) => round.id == route.params.id) as Record<
                string,
                unknown
              >) ?? {};
            resolve("");
          })
          .catch(() => {
            reject();
          });
      });
    };
    onMounted(async () => {
      if (!businesses.value?.founderBusinesses?.length) {
        await refresh();
      } else
        business.value = businesses.value?.founderBusinesses.find(
          (b) => b.id == route.query.businessId
        );
      fundingRound.value =
        ((
          business.value?.fundingRounds as Array<Record<string, unknown>>
        )?.find((round) => round.id == route.params.id) as Record<
          string,
          unknown
        >) ?? {};
      console.log(fundingRound.value);
      setCurrentPageBreadcrumbs("Funding Round", ["Business Details"]);
    });
    return {
      loading,
      formatter,
      business,
      route,
      fundingRound,
      fundingRoundExists,
      formatDate,
      currencyCodeEnums,
      currencyCodeSymbolEnums,
      op,
      investmentAmount,
      createInvestment,
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