<template>
  <v-expansion-panel>
    <v-expansion-panel-content
      v-for="(acceptedEvent,$index) in acceptedEvents"
      :key="$index"
      style="padding: 10px 0px"
    >
      <div slot="header">
        <v-layout row wrap style="padding: 5px 0px">
          <v-flex xs12 sm6>
            <strong>Owner: </strong>{{ acceptedEvent.name }}
          </v-flex>
          <v-flex xs12 sm6>
            <strong>Start Time: </strong>{{ acceptedEvent.startTime | formatDate }}
          </v-flex>
        </v-layout>
        <v-layout row wrap style="padding: 5px 0px">
          <v-flex xs12 sm6>
            <strong>Venue: </strong>{{ acceptedEvent.venue }}
          </v-flex>
          <v-flex xs12 sm6>
            <strong>End Time: </strong>{{ acceptedEvent.endTime | formatDate }}
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card-text>
            <v-data-table
              :headers="headers"
              :items="acceptedEvent.participants"
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

import { IAcceptedEvent } from '../../../shared/interface/IAcceptedEvent';

@Component({
  name: 'Events',
})
export default class Events extends Vue {
  public headers = [
    {
      text: 'Participant Name',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
  public acceptedEvents: IAcceptedEvent = this.$store.getters.acceptedEvents;
}
</script>

<style scoped>
</style>
