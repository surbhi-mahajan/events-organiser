<template>
  <div style="padding: 20px; font-size: 18px">
    <p>
      <strong>Minent: </strong>
      {{ event.name }}
    </p>
    <p>
      <strong>Hosted By: </strong>
      {{ event.owner[0].name }}
    </p>
    <p>
      <strong>At: </strong>
      {{ event.venue }}
    </p>
    <p>
      <strong>We Start: </strong>
      {{ event.startTime | formatDate }}
    </p>
    <p>
      <strong>There For: </strong>
      {{ event.endTime - event.startTime | formatTime }}
    </p>
    </br>
    </br>
    </br>
    <v-layout row wrap class="text-xs-center">
      <v-flex>
        <v-btn slot="activator" color="success" @click="onAccept" style="text-transform: none">
          I'm in!
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

import { IEvent } from '../../interface/IEvent';

@Component({
  name: 'PendingEvent',
})
export default class PendingEvent extends Vue {
  @Prop({ required: true, type: Object })
  public event: IEvent;

  public onAccept() {
    this.$store.dispatch('acceptEvent', this.event._id)
      .then(() => {
        this.$notifier.show({ text: 'Event accepted successfully.', type: 'success' });
      })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
</style>
