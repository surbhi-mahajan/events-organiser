<template>
  <CreatedOrAcceptedEvents :events="acceptedExpiredEvents" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreatedOrAcceptedEvents from '@/shared/components/CreatedOrAcceptedEvents/CreatedOrAcceptedEvents.vue';

import { EventTypes, EventStatus } from '@/shared/enum/EventsEnum';
import { IEvent } from '@/shared/interface/IEvent';

@Component({
  name: 'AcceptedExpiredEvents',
  components: {
    CreatedOrAcceptedEvents,
  },
})
export default class AcceptedExpiredEvents extends Vue {
  public headers = [
    {
      text: 'Participant Name',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
  public acceptedExpiredEvents: IEvent = this.$store.getters.acceptedExpiredEvents;

  public beforeCreate() {
    this.$store.dispatch('getEvents', { type: EventTypes.ACCEPTED, status: EventStatus.EXPIRED });
  }
}
</script>

<style scoped>
</style>
