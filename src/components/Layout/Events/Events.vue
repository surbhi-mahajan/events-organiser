<template>
  <v-container class="pa-0">
    <v-layout row wrap>
      <v-flex mb-5 elevation-2>
        <v-tabs v-model="tabs.active" color="grey lighten-4" slider-color="blue">
          <v-tab v-for="(tab, $index) in tabs" :key="$index" ripple @click="$router.push({ name: tab.route })">
              {{ tab.name }}
          </v-tab>
          <v-tab-item lazy v-for="(tab, $index) in tabs" :key="$index">
            <v-card flat>
              <v-tabs v-model="tab.active" color="grey lighten-4" slider-color="blue">
                <v-tab v-for="(innerTab, $innerTabIndex) in tab.tabs" :key="$innerTabIndex" @click="$router.push({ name: innerTab.route })">
                  {{ innerTab.name }}
                </v-tab>
                <v-tab-item v-for="(innerTab, $innerTabIndex) in tab.tabs" :key="$innerTabIndex">
                  <v-card flat>
                    <v-card-text class="pa-0" id="punit123">
                      <router-view/>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Events',
})
export default class Events extends Vue {
  public tabs = [
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
}
</script>
