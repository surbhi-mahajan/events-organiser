<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon @click.stop="onDrawerClick"></v-toolbar-side-icon>
    <v-toolbar-title>Minents</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu offset-y>
      <v-btn
        slot="activator"
        dark
        icon
      >
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-list dense style="min-width: 120px; padding: 0px">
        <v-list-tile
          v-for="(subMenu, i) in subMenus"
          :key="i"
          @click="subMenu.action"
        >
          <v-list-tile-title>{{ subMenu.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    </v-toolbar>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Header',
})
export default class Header extends Vue {

  public subMenus = [
    {
      title: 'Logout',
      action: this.onLogout,
    },
  ];

  public onDrawerClick(): void {
    this.$emit('toggleDrawer');
  }

  public onLogout() {
    localStorage.removeItem('userID');
    this.$notifier.show({ text: 'Logged out successfully.', type: 'success' });
    this.$router.push({ name: 'login' });
  }
}
</script>