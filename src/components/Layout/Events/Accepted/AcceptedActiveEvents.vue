<template>
  <v-expansion-panel>
    <v-expansion-panel-content
      v-for="(event,$index) in acceptedActiveEvents"
      :key="$index"
      style="padding: 10px 0px"
    >
      <div slot="header">
        <v-layout row wrap style="padding: 5px 0px">
          <v-flex xs12 sm6>
            <strong>Owner: </strong>{{ event.name }}
          </v-flex>
          <v-flex xs12 sm6>
            <strong>Start Time: </strong>{{ event.startTime | formatDate }}
          </v-flex>
        </v-layout>
        <v-layout row wrap style="padding: 5px 0px">
          <v-flex xs12 sm6>
            <strong>Venue: </strong>{{ event.venue }}
          </v-flex>
          <v-flex xs12 sm6>
            <strong>End Time: </strong>{{ event.endTime | formatDate }}
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card-text>
            <v-data-table
              :headers="headers"
              :items="event.participants"
              item-key="name"
              hide-actions
              class="elevation-1">
              <template slot="items" slot-scope="props">
                <td class="text-xs" >{{ props.item.name }}</td>
              </template>
            </v-data-table>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { IEvent } from '../../../../shared/interface/IEvent';

@Component({
  name: 'AcceptedActiveEvents',
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
}
</script>

<style scoped>
</style>
