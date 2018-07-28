<template>
  <div>
    <v-expansion-panel v-if="events.length">
      <v-expansion-panel-content
        v-for="(event,$index) in events"
        :key="$index"
        class="expansion-panel-container"
      >
        <div slot="header">
          <v-layout row wrap style="padding: 5px 0px">
            <v-flex xs12 sm6>
              <strong>Owner: </strong>{{ event.name }}
            </v-flex>
            <v-flex xs12 sm6>
              <strong>Venue: </strong>{{ event.venue }}
            </v-flex>
          </v-layout>
          <v-layout row wrap style="padding: 5px 0px">
            <v-flex xs12 sm6>
              <strong>Start Time: </strong>{{ event.startTime | formatDate }}
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
                hide-actions
                class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td class="text-xs" >{{ props.item.name }}</td>
                </template>
                <template slot="no-data">
                    No participants yet.
                </template>
              </v-data-table>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <p v-else style="margin: 10px; text-align: center">No event available.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { IEvent } from '@/shared/interface/IEvent';

@Component({
  name: 'CreatedOrAcceptedEvents',
})
export default class CreatedOrAcceptedEvents extends Vue {
  @Prop({ required: true, type: Array})
  public events: IEvent[];

  public headers = [
    {
      text: 'Participants',
      align: 'left',
      sortable: true,
      value: 'name',
    },
  ];
}
</script>

<style>
.expansion-panel-container .v-expansion-panel__header {
  height: auto
}
</style>
