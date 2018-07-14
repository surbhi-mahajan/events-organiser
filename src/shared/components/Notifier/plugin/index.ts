import '../types/index.d.ts';

import Vue from 'vue';

import { IConfig } from '../interface';

export const $notifier = {
  $event: new Vue(),

  show(config: IConfig) {
    this.$event.$emit('toggle', true, config);
  },

  hide(): void {
    this.$event.$emit('toggle', false);
  },
};

Vue.use({
  install(vueInstance) {
    vueInstance.prototype.$notifier = $notifier;
  },
});
