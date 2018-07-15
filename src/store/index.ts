import Vue from 'vue';
import Vuex from 'vuex';

import { IEvent } from '../shared/interface/IEvent';
import { IAcceptedEvent } from '../shared/interface/IAcceptedEvent';

Vue.use(Vuex);

interface IState {
  events: IEvent[];
  acceptedEvents: IAcceptedEvent[];
}

export default new Vuex.Store({
  state: {
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
    acceptedEvents: [
      {
        name: 'Prateek',
        venue: 'sdf palace',
        startTime: 1531567476,
        endTime: 1532025000,
        event: 'badminton',
        id: 1276456,
        participants: [
          {
            name: 'Surbhi Mahajan',
          },
        ],
      },
      {
        name: 'Manas',
        venue: 'er palace',
        startTime: 1531564450,
        endTime: 1532025030,
        event: 'carrom',
        id: 312232,
        participants: [
          {
            name: 'Surbhi Mahajan',
          },
          {
            name: 'Punit Gupta',
          },
        ],
      },
    ],
  },
  getters: {
    activeEvents(state: IState): IEvent[] {
      return state.events;
    },
    acceptedEvents(state: IState): IAcceptedEvent[] {
      return state.acceptedEvents;
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
  },
  actions: {
    acceptEvent({ commit }, id: number) {
      commit('acceptEvent', id);
    },

    rejectEvent({ commit }, id: number) {
      commit('rejectEvent', id);
    },
  },
});
