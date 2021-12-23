<template>
  <v-dialog v-model="loading" hide-overlay persistent width="300">
    <v-card>
      <v-card-text class="text-center">
        잠시만 기다려주세요..
        <v-progress-linear indeterminate class="my-2"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },

  watch: {
    isLoading() {
      this.loading = !this.loading;
    },
  },
  props: {
    isLoading: {
      type: Boolean,
    },
  },
};
</script>
