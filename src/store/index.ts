import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import '../axios/interceptors';

import { EventTypes, EventStatus } from '../shared/enum/EventsEnum';
import { IEvent } from '../shared/interface/IEvent';
import { $notifier } from '@/shared/components/Notifier/plugin';

Vue.use(Vuex);

interface IState {
  categories: string[];
  pendingActiveEvents: IEvent[];
  createdActiveEvents: IEvent[];
  createdExpiredEvents: IEvent[];
  acceptedActiveEvents: IEvent[];
  acceptedExpiredEvents: IEvent[];
}

export default new Vuex.Store({
  state: {
    categories: [
        'Football',
        'Cricket',
        'Badminton',
        'Chess',
    ],
    pendingActiveEvents: [],
    createdActiveEvents: [],
    createdExpiredEvents: [],
    acceptedActiveEvents: [],
    acceptedExpiredEvents: [],
  },
  getters: {
    categories(state: IState): string[] {
      return state.categories;
    },
    pendingActiveEvents(state: IState): IEvent[] {
      return state.pendingActiveEvents;
    },
    acceptedActiveEvents(state: IState): IEvent[] {
      return state.acceptedActiveEvents;
    },
    acceptedExpiredEvents(state: IState): IEvent[] {
      return state.acceptedExpiredEvents;
    },
    createdActiveEvents(state: IState): IEvent[] {
      return state.createdActiveEvents;
    },
    createdExpiredEvents(state: IState): IEvent[] {
      return state.createdExpiredEvents;
    },
  },
  mutations: {
    storependingActiveEvents(state: IState, events: IEvent[]) {
      state.pendingActiveEvents.splice(0, state.pendingActiveEvents.length, ...events);
    },

    storeCreatedActiveEvents(state: IState, events: IEvent[]) {
      state.createdActiveEvents.splice(0, state.createdActiveEvents.length, ...events);
    },

    storeCreatedExpiredEvents(state: IState, events: IEvent[]) {
      state.createdExpiredEvents.splice(0, state.createdExpiredEvents.length, ...events);
    },

    storeAcceptedActiveEvents(state: IState, events: IEvent[]) {
      state.acceptedActiveEvents.splice(0, state.acceptedActiveEvents.length, ...events);
    },

    storeAcceptedExpiredEvents(state: IState, events: IEvent[]) {
      state.acceptedExpiredEvents.splice(0, state.acceptedExpiredEvents.length, ...events);
    },

    acceptEvent(state: IState, eventId: number) {
      for (const [index, event] of state.pendingActiveEvents.entries()) {
        if (event.id === eventId) {
          const acceptedEvent = state.pendingActiveEvents.splice(index, 1)[0];
          state.acceptedActiveEvents.push(acceptedEvent);
          return;
        }
      }
    },

    // Only doing at frontend for now, may store in local storage
    rejectEvent(state: IState, eventId: number) {
      for (const [index, event] of state.pendingActiveEvents.entries()) {
        if (event.id === eventId) {
          state.pendingActiveEvents.splice(index, 1);
          return;
        }
      }
    },

    addEvent(state: IState, event: IEvent) {
        state.createdActiveEvents.push(event);
    },
  },
  actions: {
    login(context, payload) {
      return axios.post('/api/login', payload)
        .then((res) => {
          localStorage.setItem('userID', res.data.success.id);
          $notifier.hide();
        })
        .catch(() => void 0);
    },

    getEvents({ commit }, { type , status }: { type: EventTypes, status: EventStatus }) {
      return axios.get('/api/events', {
        params: {
          type,
          status,
        },
      })
        .then((res) => {
          const mutationFunName = function getMutationFunctionName() {
            switch (type) {
              case EventTypes.PENDING:
                return status === EventStatus.ACTIVE ? 'storependingActiveEvents' : '';
              case EventTypes.CREATED:
                return status === EventStatus.ACTIVE ? 'storeCreatedActiveEvents' : 'storeCreatedExpiredEvents';
              case EventTypes.ACCEPTED:
                return status === EventStatus.ACTIVE ? 'storeAcceptedActiveEvents' : 'storeAcceptedExpiredEvents';
              default:
                throw new Error('Event type didn\'t match the expected types!');
            }
          }();

          commit(mutationFunName, res.data.success);
        })
        .catch(() => void 0);
    },

    acceptEvent({ commit }, eventId: number) {
      return axios.post(`/api/events/${ eventId }`, { status: EventTypes.ACCEPTED })
        .then(() => {
          commit('acceptEvent', eventId);
        })
        .catch(() => void 0);
    },

    rejectEvent({ commit }, eventId: number) {
      return commit('rejectEvent', eventId);
    },

    addEvent({ commit }, event: IEvent) {
      return axios.post(`/api/events`, event)
        .then(() => {
          commit('addEvent', event);
        })
        .catch(() => void 0);
    },

  },
});
