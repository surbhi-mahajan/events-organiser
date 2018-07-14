"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
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
    },
    getters: {
        activeEvents(state) {
            return state.events;
        },
    },
    mutations: {
        acceptEvent(state, id) {
            for (const [index, event] of state.events.entries()) {
                if (event.id === id) {
                    state.events.splice(index, 1);
                    return;
                }
            }
        },
        rejectEvent(state, id) {
            for (const [index, event] of state.events.entries()) {
                if (event.id === id) {
                    state.events.splice(index, 1);
                    return;
                }
            }
        },
    },
    actions: {
        acceptEvent({ commit }, id) {
            commit('acceptEvent', id);
        },
        rejectEvent({ commit }, id) {
            commit('rejectEvent', id);
        },
    },
});
//# sourceMappingURL=index.js.map