<template>
  <v-app>
    <Notifier />
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Notifier from './shared/components/Notifier/Notifier.vue';

@Component({
  components: {
    Notifier,
  },
})
export default class App extends Vue {}
</script>
