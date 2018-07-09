<template>
  <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="onDrawerClick"></v-toolbar-side-icon>
      <v-toolbar-title>Events Organiser</v-toolbar-title>
    </v-toolbar>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'Header'
})
export default class Header extends Vue {
  onDrawerClick(): void {
    this.$emit('toggleDrawer')
  }
}
</script>