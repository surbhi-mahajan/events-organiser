import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import '../axios/interceptors';

import { EventTypes, EventStatus } from '../shared/enum/EventsEnum';
import { IEvent } from '../shared/interface/IEvent';
import { IUser } from '../shared/interface/IUser';

Vue.use(Vuex);

interface IState {
  user: IUser;
  pendingActiveEvents: IEvent[];
  createdActiveEvents: IEvent[];
  createdExpiredEvents: IEvent[];
  acceptedActiveEvents: IEvent[];
  acceptedExpiredEvents: IEvent[];
}

export default new Vuex.Store({
  state: {
    user: {
      name: localStorage.getItem('userName') || '',
      id: localStorage.getItem('userID') || '',
    },
    pendingActiveEvents: [],
    createdActiveEvents: [],
    createdExpiredEvents: [],
    acceptedActiveEvents: [],
    acceptedExpiredEvents: [],
  },
  getters: {
    userDetails(state: IState): IUser {
      return state.user;
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
    storeUserDetails(state: IState, user: IUser) {
      state.user = user;
      localStorage.setItem('userID', user.id);
      localStorage.setItem('userName', user.name);
    },

    removeUserDetails(state: IState, user: IUser) {
      state.user.id = '';
      state.user.name = '';

      localStorage.removeItem('userID');
      localStorage.removeItem('userName');
    },

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
        if (event._id === eventId) {
          const acceptedEvent = state.pendingActiveEvents.splice(index, 1)[0];
          state.acceptedActiveEvents.push(acceptedEvent);
          return;
        }
      }
    },

    addEvent(state: IState, event: IEvent) {
        state.createdActiveEvents.push(event);
    },
  },
  actions: {
    login({ commit }, payload) {
      return axios.post('/api/login', payload)
        .then((res) => {
          commit('storeUserDetails', res.data.success);
        });
    },

    signup({ commit }, user) {
      return axios.post('/api/signup', user)
        .then((res) => {
          commit('storeUserDetails', res.data.success);
        });
    },

    logout({ commit }) {
      return commit('removeUserDetails');
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

          return commit(mutationFunName, res.data.success);
        });
    },

    acceptEvent({ commit }, eventId: number) {
      return axios.put(`/api/events/${ eventId }`, { status: EventTypes.ACCEPTED })
        .then(() => {
          return commit('acceptEvent', eventId);
        });
    },

    addEvent({ commit }, event: IEvent) {
      return axios.post(`/api/events`, event)
        .then(() => {
          return commit('addEvent', event);
        });
    },
  },
});
