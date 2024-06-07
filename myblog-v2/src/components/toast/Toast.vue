<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar.status" top :color="snackbar.color">
      <i :class="snackbar.icon" style="margin-right: 10px;" />
      {{ snackbar.mes }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
  computed: {
    snackbar: {
      set (value) {
        this.$store.state.snackbar = value
      },
      get () {
        return this.$store.state.snackbar
      }
    }
  }
}
</script>
