<template>
  <div style="border: 1px solid black; padding: 10px; margin: 10px;">
    <p>
      <strong>Name: </strong>
      {{ event.name }}
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
    <p>
      <strong>Sport: </strong>
      {{ event.event }}
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
  name: 'ActiveEvent',
})
export default class ActiveEvent extends Vue {
  @Prop({ required: true, type: Object})
  public event: IEvent;

  public onAccept() {
    this.$store.dispatch('acceptEvent', this.event.id);
    this.$notifier.show({ text: 'Event has been accepted successfully.', type: 'success' });
  }

  public onReject() {
    this.$store.dispatch('rejectEvent', this.event.id);
    this.$notifier.show({ text: 'Event has been rejected successfully.', type: 'success' });
  }
}
</script>

<style scoped>
</style>
