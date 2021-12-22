<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container>
        <v-card>
          <h1 class="text-center">김경진이 개발한 휴가시스템</h1>
        </v-card>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
