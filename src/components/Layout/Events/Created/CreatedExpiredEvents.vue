<template>
    <CreatedOrAcceptedEvents :events="createdExpiredEvents" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CreatedOrAcceptedEvents from '@/shared/components/CreatedOrAcceptedEvents/CreatedOrAcceptedEvents.vue';

import { EventTypes, EventStatus } from '@/shared/enum/EventsEnum';
import { IEvent } from '@/shared/interface/IEvent';

@Component({
  name: 'CreatedExpiredEvents',
  components: {
    CreatedOrAcceptedEvents,
  },
})
export default class CreatedExpiredEvents extends Vue {
  public headers = [
    {
      text: 'Participant Name',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
  public createdExpiredEvents: IEvent = this.$store.getters.createdExpiredEvents;

  public beforeCreate() {
    this.$store.dispatch('getEvents', { type: EventTypes.CREATED, status: EventStatus.EXPIRED })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
</style>
