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
              v-for="(event, index) in pendingEvents"
              :key="event.id"
            >
              <PendingEvent :event="event" :style="{ height: '100%', 'background-image': getCrouselBackgroundColor(index) }"/>
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
  public crouselBackgroundColors = [
    'linear-gradient(120deg, #ffff 0%, #c2e9fb 100%)',
    'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(120deg, rgba(228, 255, 252, 1) 0%, #ebedee 100%)',
    'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
    'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
    'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
    'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
    'linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)',
    `radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%), radial-gradient(91% 146%, rgba(255,255,255,0.50) 47%,
    rgba(0,0,0,0.50) 100%)`,
    'linear-gradient(to top, #dfe9f3 0%, white 100%)',
  ];
  public randomIndexToStart = Math.floor(this.crouselBackgroundColors.length * Math.random());
  public pendingEvents = this.$store.getters.pendingActiveEvents;

  public beforeCreate() {
    this.$store.dispatch('getEvents', { type: EventTypes.PENDING, status: EventStatus.ACTIVE })
      .catch(() => void 0);
  }

  /**
   * Pick any random index in 'crouselBackgroundColors'. This will be the colour to be shown on 1st notification.
   * After that, pick next colours in sequence untill we reach last value of array. Then rotate from 0th index.
   */
  public getCrouselBackgroundColor(index: number): string {
    return this.crouselBackgroundColors[(this.randomIndexToStart + index) % this.crouselBackgroundColors.length];
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
