<template>
  <div>
    <v-head />
    <v-sdidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import VHead from "./Header.vue";
import VSdidebar from "./Sidebar.vue";
export default {
  data() {
    return {};
  },
  components: {
    VHead,
    VSdidebar,
  },
};
</script>

<style></style>
