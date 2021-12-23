<template>
  <v-snackbar v-model="show" top :timeout="timeout" :color="color" multi-line>
    {{ snackText }}
    <template v-slot:action="{}">
      <!-- <v-btn color="pink" text v-bind="attrs" @click="show = false">
				Close
			</v-btn> -->
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      timeout: 4000,
      snackText: "",
    };
  },
  props: {
    discriminant: {
      type: Boolean,
    },
    text: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  methods: {
    setSnackText() {
      this.snackText = this.text;
    },
  },
  watch: {
    discriminant() {
      this.setSnackText();
      this.show = !this.show;
    },
  },
};
</script>
