import Vue from 'vue';
import Vuex from 'vuex';

import { IEvent } from '../shared/interface/IEvent';

Vue.use(Vuex);

interface IState {
  events: IEvent[];
  createdActiveEvents: IEvent[];
  createdExpiredEvents: IEvent[];
  acceptedActiveEvents: IEvent[];
  acceptedExpiredEvents: IEvent[];
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
    createdActiveEvents: [
      {
        name: 'Prateek',
        venue: 'sdf palace',
        startTime: 1531567476,
        endTime: 1532025000,
        event: 'kabaddi',
        id: 1276456,
        participants: [
          {
            name: 'sdf',
          },
          {
            name: 'qwe',
          },
        ],
      },
      {
        name: 'Prateek',
        venue: 'er palace',
        startTime: 1531564450,
        endTime: 1532025030,
        event: 'snooker',
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
    createdExpiredEvents: [
      {
        name: 'Prateek',
        venue: 'trgrg adf',
        startTime: 1531567476,
        endTime: 1532025000,
        event: 'soccer',
        id: 1276456,
        participants: [
          {
            name: 'werer',
          },
          {
            name: 'cxvxcv',
          },
        ],
      },
      {
        name: 'Prateek',
        venue: 'er qwe',
        startTime: 1531564450,
        endTime: 1532025030,
        event: 'pool',
        id: 312232,
        participants: [
          {
            name: 'Ankit',
          },
        ],
      },
    ],
    acceptedActiveEvents: [
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
    acceptedExpiredEvents: [
      {
        name: 'My name 1',
        venue: 'wre palace',
        startTime: 1531567476,
        endTime: 1532025000,
        event: 'my sport',
        id: 1276456,
        participants: [
          {
            name: 'abc',
          },
          {
            name: 'pqr',
          },
          {
            name: 'xyz',
          },
        ],
      },
      {
        name: 'My name 2',
        venue: 'eerr palace',
        startTime: 1531564450,
        endTime: 1532025030,
        event: 'TT',
        id: 312232,
        participants: [
          {
            name: 'qwer',
          },
          {
            name: 'rewq',
          },
        ],
      },
    ],
  },
  getters: {
    activeEvents(state: IState): IEvent[] {
      return state.events;
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
