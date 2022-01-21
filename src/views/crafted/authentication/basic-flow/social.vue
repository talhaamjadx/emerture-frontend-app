<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const token = route.query.access_token;
    if (!token) {
      return router.push("/signin");
    }
    onMounted(() => {
      window.localStorage.setItem("access_token", token as string);
      router.push("/");
    });
  },
});
</script>
