<template>
  <CreatedOrAcceptedEvents :events="acceptedActiveEvents" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreatedOrAcceptedEvents from '@/shared/components/CreatedOrAcceptedEvents/CreatedOrAcceptedEvents.vue';

import { EventTypes, EventStatus } from '@/shared/enum/EventsEnum';
import { IEvent } from '@/shared/interface/IEvent';

@Component({
  name: 'AcceptedActiveEvents',
  components: {
    CreatedOrAcceptedEvents,
  },
})
export default class AcceptedActiveEvents extends Vue {
  public headers = [
    {
      text: 'Participant Name',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
  public acceptedActiveEvents: IEvent = this.$store.getters.acceptedActiveEvents;

  public created() {
    this.$store.dispatch('getEvents', { type: EventTypes.ACCEPTED, status: EventStatus.ACTIVE });
  }
}
</script>

<style scoped>
</style>
