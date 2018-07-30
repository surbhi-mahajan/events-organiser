<template>
  <v-navigation-drawer :value="value" @input="onToggle" fixed>
    <v-list dense>
      <v-list-tile :class="isActiveRoute(/^dashboard$/) ? activeClass : ''" @click="$router.push({ name: 'dashboard' })">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :class="isActiveRoute(/^create$/) ? activeClass : 'create'" @click="$router.push({ name: 'create' })">
        <v-list-tile-action>
          <v-icon>add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Create</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile :class="isActiveRoute(/^events.(created|accepted).(active|expired)$/) ? activeClass : 'events'" @click="$router.push({ name: 'events' })">
        <v-list-tile-action>
          <v-icon>event</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>My Events</v-list-tile-title>
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

  public onToggle(isOpen: boolean): void {
    this.$emit('input', isOpen);
  }

  public isActiveRoute(route: RegExp): boolean {
    return route.test(this.$router.currentRoute.name || '');
  }
}
</script>
<style>
.theme--light {
  background: rgba(0, 0, 0, 0.08)
}
</style>
