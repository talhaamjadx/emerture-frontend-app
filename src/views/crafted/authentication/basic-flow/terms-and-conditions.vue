<template>
  <!--begin::Wrapper-->
  <div
    style="width: 1000px !important"
    class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto"
    v-html="inner"
  ></div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Quill from "quill";

export default defineComponent({
  name: "terms-and-conditions",
  setup() {
    const store = useStore();
    let termsAndConditions = { value: "" };
    const inner = ref<string>("");
    const quill = new Quill();
    console.log({ quill });
    onMounted(async () => {
      try {
        const response = await store.dispatch(
          Actions.GET_CONFIGURATION_BY_KEY,
          "termsAndConditions"
        );
        if (!response.success) throw new Error();
        termsAndConditions = response.data;
        let article = document.createElement("article");
        let quill = new Quill(article, { readOny: true });
        quill.setContents(JSON.parse(termsAndConditions.value));
        inner.value = quill.root.innerHTML;
      } catch (err) {
        console.log(err);
      }
    });
    return {
      inner,
    };
  },
});
</script>
