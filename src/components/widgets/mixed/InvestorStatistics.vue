<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 py-5">
      <h3 class="card-title fw-bolder text-white">Investor Statistics</h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <div class="card-p mt-n20 position-relative">
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
            <div class="row">
              <div class="col-9">
                <p
                  class="pt-lg-5 mt-xl-2 mt-0 pt-md-3"
                  style="color: rgb(207, 187, 88); font-size: 15px"
                >
                  Matched Investment Oppertunities
                </p>
              </div>
              <div
                class="col-3 display-2 text-center"
                style="color: rgb(226, 213, 147)"
              >
                0
              </div>
            </div>
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
            <div class="row">
              <div class="col-9">
                <p
                  class="pt-lg-5 mt-xl-2 mt-0 pt-md-3"
                  style="color: #9bbfd3; font-size: 15px"
                >
                  Investment Oppertunities Pursued
                </p>
              </div>
              <div class="col-3 display-2 text-center" style="color: #9bbfd3">
                0
              </div>
            </div>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0 mb-5">
          <div class="col bg-light-danger px-6 py-8 rounded-2 me-7">
            <div class="row">
              <div class="col-9">
                <p
                  class="pt-lg-5 mt-xl-2 mt-0 pt-md-3"
                  style="color: #e2adbc; font-size: 15px"
                >
                  Successful Investment Oppertunities
                </p>
              </div>
              <div class="col-3 display-2 text-center" style="color: #e2adbc">
                0
              </div>
            </div>
          </div>
          <div class="col bg-light-success px-6 py-8 rounded-2">
            <div class="row">
              <div class="col-9">
                <p
                  class="pt-lg-5 mt-xl-2 mt-0 pt-md-3"
                  style="color: #9ae6c0; font-size: 15px"
                >
                  Declined Investment Oppertunities
                </p>
              </div>
              <div class="col-3 display-2 text-center" style="color: #9ae6c0">
                0
              </div>
            </div>
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
  name: "widget-1",
  components: {},
  props: {
    widgetClasses: String,
    widgetColor: String,
    strokeColor: String,
  },
  setup(props) {
    const labelColor = getCSSVariableValue("--bs-gray-500");
    const borderColor = getCSSVariableValue("--bs-gray-200");

    const color = getCSSVariableValue("--bs-" + props.widgetColor);

    const strokeColor = ref(props.strokeColor);

    const chartOptions = {
      chart: {
        fontFamily: "inherit",
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 5,
          left: 0,
          blur: 3,
          color: strokeColor.value,
          opacity: 0.5,
        },
      },
      plotOptions: {},
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: 0,
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [strokeColor.value],
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: borderColor,
            width: 1,
            dashArray: 3,
          },
        },
      },
      yaxis: {
        min: 0,
        max: 80,
        labels: {
          show: false,
          style: {
            colors: labelColor,
            fontSize: "12px",
          },
        },
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
        },
        y: {
          formatter: function (val) {
            return "$" + val + " thousands";
          },
        },
        marker: {
          show: false,
        },
      },
      markers: {
        colors: [color],
        strokeColor: [strokeColor.value],
        strokeWidth: 3,
      },
    };

    const series = [
      {
        name: "Net Profit",
        data: [30, 45, 32, 70, 40, 40, 40],
      },
    ];

    return {
      series,
      chartOptions,
    };
  },
});
</script>
