<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row justify-center align-center>
        <template v-if="pendingEvents.length">
          <!-- hide-delimiters -->
          <v-carousel
            delimiter-icon="stop"
            style="max-width: 400px;"
            :cycle="false"
            id="dashboard-events-crousel">
            <v-carousel-item
              v-for="event in pendingEvents"
              :key="event.id"
              src="sports.jpg"
              id="mnop"
            >
              <PendingEvent :event="event" />
            </v-carousel-item>
          </v-carousel>
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

<style>
#dashboard-events-crousel .v-jumbotron img.v-jumbotron__image {
  height: 100%;
}
#dashboard-events-crousel .v-carousel__prev button {
  color: rgba(0,0,0,0.54);
}
#dashboard-events-crousel .v-carousel__next button {
  color: rgba(0,0,0,0.54);
}
</style>
