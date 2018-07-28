<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row justify-center align-center>
        <template v-if="pendingEvents.length">
          <PendingEvent v-for="event in pendingEvents" :key="event.id" :event="event" />
        </template>
        <span v-else>No active Events to participate for now.</span>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PendingEvent from '@/shared/components/PendingEvent/PendingEvent.vue';
import { EventTypes, EventStatus } from '@/shared/enum/EventsEnum';

@Component({
  name: 'Dashboard',
  components: {
    PendingEvent,
  },
})
export default class Dashboard extends Vue {
  public pendingEvents = this.$store.getters.pendingActiveEvents;

  public beforeCreate() {
    this.$store.dispatch('getEvents', { type: EventTypes.PENDING, status: EventStatus.ACTIVE })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
</style>
