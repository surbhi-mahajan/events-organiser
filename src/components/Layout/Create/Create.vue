<template>
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout row justify-center align-center>
                <PendingEvent v-for="event in pendingEvents" :key="event.id" :event="event" />
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import PendingEvent from '@/shared/components/PendingEvent/PendingEvent.vue';

    @Component({
        name: 'Create',
        components: {
            PendingEvent,
        },
    })
    export default class Create extends Vue {
        public pendingEvents = this.$store.getters.pendingActiveEvents;
    }
</script>

<style scoped>
</style>
