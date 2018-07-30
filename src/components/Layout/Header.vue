<template>
  <v-toolbar color="indigo" dark absolute app>
    <v-toolbar-side-icon @click.stop="onDrawerClick" class="hidden-xs-only"></v-toolbar-side-icon>
    <v-toolbar-title>
      <a @click="$router.push({ name: 'dashboard' })" style="color: white">
        Minents
      </a>
      <!-- <v-avatar
        tile
        :size="4"
        color="grey lighten-4"
      >
        <img src="../../assets/logo.svg" width="40px" alt="Minents">
      </v-avatar> -->
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="hidden-sm-and-up">
      <v-btn icon @click="$router.push({ name: 'create' })">
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push({ name: 'events' })">
        <v-icon>event</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>account_circle</v-icon>
        </v-btn>

        <v-list dense style="padding: 0px">
          <v-list-tile
            v-for="(subMenu, i) in subMenus"
            :key="i"
            @click="subMenu.action"
          >
            <v-list-tile-title>{{ subMenu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>

    <v-toolbar-items class="hidden-xs-only">
      <v-btn
        flat
        @click="$router.push({ name: 'create' })"
      >
        <v-icon left>add</v-icon>
        <span>Create</span>
      </v-btn>

      <v-btn
        flat
        @click="$router.push({ name: 'events' })"
      >
        <v-icon left>event</v-icon>
        <span>My Events</span>
      </v-btn>

      <v-menu offset-y>
        <v-btn
          slot="activator"
          flat
        >
          <v-icon left>account_circle</v-icon>
          <span>{{ user.name }}</span>
        </v-btn>

        <v-list dense style="padding: 0px">
          <v-list-tile
            v-for="(subMenu, i) in subMenus"
            :key="i"
            @click="subMenu.action"
          >
            <v-list-tile-title>{{ subMenu.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    </v-toolbar>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '../../shared/interface/IUser';

@Component({
  name: 'Header',
})
export default class Header extends Vue {
  public user: IUser = this.$store.getters.userDetails;

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
    this.$store.dispatch('logout')
      .then(() => {
        this.$notifier.show({ text: 'Logged out successfully.', type: 'success' });
        this.$router.push({ name: 'login' });
      });
  }
}
</script>