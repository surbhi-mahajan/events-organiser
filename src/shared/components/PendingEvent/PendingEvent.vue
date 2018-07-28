<template>
  <div style="border: 1px solid black; padding: 10px; margin: 10px;">
    <p>
      <strong>Event: </strong>
      {{ event.name }}
    </p>
    <p>
      <strong>Owner: </strong>
      {{ event.owner[0].name }}
    </p>
    <p>
      <strong>Venue: </strong>
      {{ event.venue }}
    </p>
    <p>
      <strong>Start Time: </strong>
      {{ event.startTime | formatDate }}
    </p>
    <p>
      <strong>End Time: </strong>
      {{ event.endTime | formatDate }}
    </p>
    <v-layout row wrap class="text-xs-center">
      <v-flex sm6>
        <v-tooltip right>
          <v-btn flat icon slot="activator" color="success" @click="onAccept">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <span>Accept</span>
        </v-tooltip>
      </v-flex>
      <v-flex sm6>
        <v-tooltip right>
          <v-btn flat icon slot="activator" color="error" @click="onReject">
            <v-icon>thumb_down</v-icon>
          </v-btn>
          <span>Reject</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { IEvent } from '../../interface/IEvent';

@Component({
  name: 'PendingEvent',
})
export default class PendingEvent extends Vue {
  @Prop({ required: true, type: Object })
  public event: IEvent;

  public onAccept() {
    this.$store.dispatch('acceptEvent', this.event.id)
      .then(() => {
        this.$notifier.show({ text: 'Event has been accepted successfully.', type: 'success' });
      })
      .catch(() => void 0);
  }

  public onReject() {
    this.$store.dispatch('rejectEvent', this.event.id)
      .then(() => {
        this.$notifier.show({ text: 'Event has been rejected successfully.', type: 'success' });
      })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
</style>
