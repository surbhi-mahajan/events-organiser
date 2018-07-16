import Vue from 'vue';
import Vuex from 'vuex';

import { IEvent } from '../shared/interface/IEvent';

Vue.use(Vuex);

interface IState {
  events: IEvent[];
  categories: string[];
}

export default new Vuex.Store({
  state: {
    categories: [
        'football',
        'cricket',
    ],
    events: [
      {
        name: 'Surbhi Mahajan',
        venue: 'abc palace',
        startTime: 1531567476,
        endTime: 1532025000,
        event: 'football',
        id: 123456,
      },
      {
        name: 'Punit Gupta',
        venue: 'pqr palace',
        startTime: 1531564450,
        endTime: 1532025030,
        event: 'cricket',
        id: 31232,
      },
    ],
  },
  getters: {
    categories(state: IState): string[] {
      return state.categories;
    },
    activeEvents(state: IState): IEvent[] {
      return state.events;
    },
  },
  mutations: {
    acceptEvent(state: IState, id: number) {
      for (const [index, event] of state.events.entries()) {
        if (event.id === id) {
          state.events.splice(index, 1);
          return;
        }
      }
    },

    rejectEvent(state: IState, id: number) {
      for (const [index, event] of state.events.entries()) {
        if (event.id === id) {
          state.events.splice(index, 1);
          return;
        }
      }
    },

    addEvent(state: IState, event: IEvent) {
        state.events.push(event);
    },
  },
  actions: {
    acceptEvent({ commit }, id: number) {
      commit('acceptEvent', id);
    },

    rejectEvent({ commit }, id: number) {
      commit('rejectEvent', id);
    },

    addEvent({ commit }, event: IEvent) {
        commit('addEvent', event);
    },

  },
});
