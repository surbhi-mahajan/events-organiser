<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <v-flex mb-5 elevation-2>
        <v-tabs v-model="tabs.active" color="grey lighten-4" slider-color="blue">
          <v-tab v-for="tab in tabs" :key="tab.name" ripple @click="$router.push({ name: tab.route })">
              {{ tab.name }}
          </v-tab>
          <v-tab-item lazy v-for="tab in tabs" :key="tab.name">
            <v-card flat>
              <v-tabs v-model="tab.active" color="grey lighten-4" slider-color="blue">
                <v-tab v-for="innerTab in tab.tabs" :key="innerTab.name" @click="$router.push({ name: innerTab.route })">
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
import { Route } from 'vue-router';

@Component({
  name: 'Events',
})
export default class Events extends Vue {

  public tabs: any = [
      {
          name: 'Created Event',
          route: 'events.created',
          tabs: [
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
      {
          name: 'Accepted Event',
          route: 'events.accepted',
          tabs: [
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
  ];

  @Watch('$route')
  public onRouteChanged(to: Route, from: Route): void {
      this.activateTabs(to.fullPath);
  }

  public _findRoute(route: string): string {
      return this.$router.resolve({name: route}).route.fullPath;
  }

  public activateTabs(fullPath: string): void {
      for (let i = 0; i < this.tabs.length; i++) {
          const tabMap: any = this.tabs[i];

          // If URL matches then activate it otherwise deactivate it
          this.tabs.active = this._findRoute(tabMap.route) === fullPath ? i : 0;

          // Main Tab may have same route as child-tab, so even if the route is found, traverse to children as well
          if (tabMap.tabs && tabMap.tabs.length) {
              for (let j = 0; j < tabMap.tabs.length; j++) {
                  const childTabMap = tabMap.tabs[j];

                  // Deactivate by default
                  tabMap.tabs.active = false;
                  // If URL matches then activate child as well as parent tab
                  if (this._findRoute(childTabMap.route) === fullPath) {
                      tabMap.tabs.active = j + 1;
                      this.tabs.active = i + 1;
                  }
              }
          }
      }
  }
}
</script>
