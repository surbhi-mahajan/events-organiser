"use strict";
import Vue from 'vue';
export const $notifier = {
    $event: new Vue(),
    show(config) {
        this.$event.$emit('toggle', true, config);
    },
    hide() {
        this.$event.$emit('toggle', false);
    },
};
Vue.use({
    install(vueInstance) {
        vueInstance.prototype.$notifier = $notifier;
    },
});
//# sourceMappingURL=index.js.map