<template>
  <!--begin::Wrapper-->
  <div
    style="width: 1000px !important"
    class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto"
  ></div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "terms-and-conditions",
  setup() {
    const store = useStore()
    let termsAndConditions = null
    onMounted(async () => {
      try{
        const response = await store.dispatch(Actions.GET_CONFIGURATION_BY_KEY, "termsAndConditions")
        if(!response.success) throw new Error()
        termsAndConditions = response.data
        console.log({termsAndConditions})
      }
      catch(err){
        //
      }
    });
    return {};
  },
});
</script>
