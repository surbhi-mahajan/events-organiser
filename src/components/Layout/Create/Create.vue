<template>
    <v-container fluid>
        <v-form ref="form" lazy-validation>

            <v-text-field
                v-model="event.name"
                label="Event"
                required
            ></v-text-field>

            <v-text-field
                v-model="event.venue"
                label="Venue"
                required
            ></v-text-field>


            <v-layout row wrap>
                <v-flex xs12 sm5>
                    <v-menu
                        ref="startDate"
                        :close-on-content-click="false"
                        v-model="showStartDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <v-text-field
                            slot="activator"
                            v-model="event.startDate"
                            label="Start Date"
                            prepend-icon="event"
                            @blur="unformattedStartDate = parseDate(event.startDate)"
                        ></v-text-field>
                        <v-date-picker v-model="unformattedStartDate" :allowed-dates="allowedStartDates" no-title @input="onStartDateSelection"></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-spacer></v-spacer>

                <v-flex xs12 sm5>
                    <v-menu
                        :close-on-content-click="false"
                        v-model="showEndDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                        >
                        <v-text-field
                            slot="activator"
                            v-model="event.endDate"
                            label="End Date"
                            prepend-icon="event"
                            @blur="unformattedEndDate = parseDate(event.endDate)"
                        ></v-text-field>
                        <v-date-picker v-model="unformattedEndDate" :allowed-dates="allowedEndDates" no-title @input="onEndDateSelection"></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>


            <v-layout row wrap>
                <v-flex xs12 sm5>
                    <v-dialog
                        ref="startMenu"
                        v-model="startMenu"
                        lazy
                        full-width
                        width="290px"
                    >
                        <v-text-field
                            slot="activator"
                            v-model="event.startTime"
                            label="Start Time"
                            prepend-icon="access_time"
                            readonly
                        ></v-text-field>
                        <v-time-picker
                            v-if="startMenu"
                            v-model="event.startTime"
                            @change="$refs.startMenu.save(event.startTime)"
                        ></v-time-picker>
                    </v-dialog>
                </v-flex>

                <v-spacer></v-spacer>

                <v-flex xs12 sm5>
                    <v-layout row wrap>
                      <v-flex xs5 sm5 md3 style="padding: 25px 0px;">
                        <v-layout col wrap style="color: rgba(0,0,0,0.54); font-size: 18px;">
                          <v-flex>
                            <span class="pl-0">
                              <v-icon>timer</v-icon>
                              Duration
                            </span>
                          </v-flex>
                          <v-flex style="text-align: center">
                            (min)
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex offset-xs1 xs6 sm6 md8 style="margin-top: 16px;">
                        <v-slider
                          v-model="event.duration"
                          step="10"
                          :max="240"
                          :min="10"
                          always-dirty
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>

            <v-btn
                color="success"
                @click="submitEvent"
            >
                Submit
            </v-btn>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IEvent } from '../../../shared/interface/IEvent';
import moment from 'moment-timezone';

interface ICreateEvent extends IEvent {
  duration: number;
  startDate: string;
  endDate: string;
}

@Component({
  name: 'Create',
  components: {},
})
export default class Create extends Vue {
  public event: ICreateEvent = {
    startDate: this.formatDate(moment()),
    endDate: this.formatDate(moment()),
  } as ICreateEvent;

  public startMenu: boolean = false;
  public showStartDateMenu: boolean = false;
  public showEndDateMenu: boolean = false;
  public unformattedStartDate: string = '';
  public unformattedEndDate: string = '';

  public allowedStartDates(date: string) {
    return moment(date) >= moment().startOf('day');
  }

  public allowedEndDates(date: string) {
    return moment(date) >= moment().startOf('day') && moment(date) >= moment(this.event.startDate, 'DD MMM YYYY');
  }

  public formatDate(date: string | moment.Moment) {
    return moment(date).format('DD MMM YYYY');
  }

  public parseDate(date: string) {
    return moment(date, 'DD MMM YYYY').format('YYYY-MM-DD');
  }

  public onStartDateSelection() {
    this.showStartDateMenu = false;
    this.event.startDate = this.formatDate(this.unformattedStartDate);

    if (moment(this.event.endDate, 'DD MMM YYYY') <= moment(this.event.startDate, 'DD MMM YYYY')) {
        this.unformattedEndDate = this.unformattedStartDate;
        this.event.endDate = this.event.startDate;
    }
  }

  public onEndDateSelection() {
    this.showEndDateMenu = false;
    this.event.endDate = this.formatDate(this.unformattedEndDate);
  }

  public submitEvent() {
    const startTime =
      this.event.startTime &&
      moment(this.event.startDate + this.event.startTime, 'DD MMM YYYY HH:mm').unix();

    // Convert duration in seconds
    const endTime = startTime + this.event.duration * 60;

    const payload = {
      name: this.event.name,
      venue: this.event.venue,
      startTime,
      endTime,
    };

    this.$store.dispatch('addEvent', payload)
      .then(() => {
        this.$router.push({ name: 'events.created.active' });
        this.$notifier.show({
            text: 'Event added successfully.',
            type: 'success',
        });
      })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
</style>
