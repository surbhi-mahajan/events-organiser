<template>
    <v-container fluid>
        <v-form ref="form" lazy-validation>
            <v-text-field
                v-model="event.name"
                :counter="10"
                label="Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="event.venue"
                label="Venue"
                required
            ></v-text-field>

            <v-select
                v-model="event.event"
                :items="categories"
                label="Events"
                required
            ></v-select>

            <v-layout row wrap>
                <v-flex xs11 sm5>
                    <v-menu
                        ref="startMenu"
                        :close-on-content-click="false"
                        v-model="startMenu"
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
                    </v-menu>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs11 sm5>
                    <v-menu
                        ref="endMenu"
                        :close-on-content-click="false"
                        v-model="endMenu"
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
                            v-model="event.endTime"
                            label="End Time"
                            prepend-icon="access_time"
                            readonly
                        ></v-text-field>
                        <v-time-picker
                            v-if="endMenu"
                            v-model="event.endTime"
                            @change="$refs.endMenu.save(event.endTime)"
                        ></v-time-picker>
                    </v-menu>
                </v-flex>
            </v-layout>

            <v-btn
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

@Component({
    name: 'Create',
    components: {

    },
})
export default class Create extends Vue {
    public event: IEvent = {} as IEvent;
    public categories = this.$store.getters.categories;
    public startMenu: boolean = false;
    public endMenu: boolean = false;

  /*  allowedHours(v: any) {
        return v > new Date().getHours()
    }

    allowedMinutes(v: any) {
        return v > new Date().getMinutes()
    }*/

    public submitEvent() {
        const now = moment().format('DD-MM-YYYY');
        const startTime = moment(now +  this.event.startTime, 'DD-MM-YYYY HH:mm').utc().unix();
        const endTime = moment(now +  this.event.endTime, 'DD-MM-YYYY HH:mm').utc().unix();
        const event = {...this.event, startTime, endTime};
        this.$store.dispatch('addEvent', event);
        this.event = {} as IEvent;
    }

}
</script>

<style scoped>
</style>
