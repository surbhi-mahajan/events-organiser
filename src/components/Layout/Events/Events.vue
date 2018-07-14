<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout row justify-center align-center>
                <ActiveEvent v-for="event in activeEvents" :key="event.id" :event="event" />
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ActiveEvent from '../../../shared/components/ActiveEvent/ActiveEvent.vue';

    @Component({
        name: 'Dashboard',
        components: {
            ActiveEvent,
        },
    })
    export default class Dashboard extends Vue {
        public activeEvents = this.$store.getters.activeEvents;
    }
</script>

<style scoped>
</style>
