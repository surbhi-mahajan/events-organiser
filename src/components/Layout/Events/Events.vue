<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <v-flex mb-5 elevation-2>
        <v-tabs v-model="tabs.active" color="grey lighten-4" slider-color="blue">
          <v-tab v-for="tab in tabs.list" :key="tab.name" ripple @click="$router.push({ name: tab.route })">
              {{ tab.name }}
          </v-tab>
          <v-tab-item lazy v-for="tab in tabs.list" :key="tab.name">
            <v-card flat>
              <v-tabs v-model="tab.tabs.active" color="grey lighten-4" slider-color="blue">
                <v-tab v-for="innerTab in tab.tabs.list" :key="innerTab.name" @click="$router.push({ name: innerTab.route })">
                  {{ innerTab.name }}
                </v-tab>
              </v-tabs>
            </v-card>
          </v-tab-item>
        </v-tabs>
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'Events',
})
export default class Events extends Vue {
  public tabs = {
    active: 0,
    list: [
      {
        name: 'Created Event',
        route: 'events.created',
        tabs: {
          active: 0,
          list: [
            {
              name: 'Active',
              route: 'events.created.active',
            },
            {
              name: 'Expired',
              route: 'events.created.expired',
            },
          ],
        },
      },
      {
        name: 'Accepted Event',
        route: 'events.accepted',
        tabs: {
          active: 0,
          list: [
            {
              name: 'Active',
              route: 'events.accepted.active',
            },
            {
              name: 'Expired',
              route: 'events.accepted.expired',
            },
          ],
        },
      },
    ],
  };

  @Watch('$route.name')
  public onRouteChanged(currentRoute: string): void {
    this.activateTabs(currentRoute);
  }

  public activateTabs(currentRoute: string): void {
    for (const [outerTabIndex, outerTab] of this.tabs.list.entries()) {
      for (const [innerTabIndex, innerTab] of outerTab.tabs.list.entries()) {
        if (innerTab.route === currentRoute) {
          this.tabs.active = outerTabIndex;
          outerTab.tabs.active = innerTabIndex;
          return;
        }
      }
    }
  }
}
</script>
