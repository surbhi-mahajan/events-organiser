<template>
  <v-navigation-drawer :value="value" @input="onToggle" fixed app>
    <v-list dense>
      <v-list-tile :class="isActiveRoute('dashboard') ? activeClass : ''" @click="$router.push({ name: 'dashboard' })">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :class="isActiveRoute('about') ? activeClass : 'about'" @click="$router.push({ name: 'about' })">
        <v-list-tile-action>
          <v-icon>group</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>About Us</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'Navbar',
})
export default class Navbar extends Vue {
  @Prop({ type: Boolean, default: false })
  public value: boolean;

  @Watch('$route.name')
  public forceUpdate() {
    this.$forceUpdate();
  }

  get activeClass(): string {
    return 'theme--light';
  }

  public onToggle(): void {
    this.$emit('input', this.value);
  }

  public isActiveRoute(route: string): boolean {
    return (this.$router.currentRoute.name || '').indexOf(route) !== -1;
  }
}
</script>
<style>
.theme--light {
  background: rgba(0, 0, 0, 0.08)
}
</style>
