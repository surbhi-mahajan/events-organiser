<template>
    <CreatedOrAcceptedEvents :events="createdActiveEvents" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreatedOrAcceptedEvents from '@/shared/components/CreatedOrAcceptedEvents/CreatedOrAcceptedEvents.vue';

import { EventTypes, EventStatus } from '@/shared/enum/EventsEnum';
import { IEvent } from '@/shared/interface/IEvent';

@Component({
  name: 'CreatedActiveEvents',
  components: {
    CreatedOrAcceptedEvents,
  },
})
export default class CreatedActiveEvents extends Vue {
  public headers = [
    {
      text: 'Participant Name',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
  public createdActiveEvents: IEvent = this.$store.getters.createdActiveEvents;

  public beforeCreate() {
    this.$store.dispatch('getEvents', { type: EventTypes.CREATED, status: EventStatus.ACTIVE });
  }
}
</script>

<style scoped>
</style>
