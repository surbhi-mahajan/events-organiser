<template>
  <v-alert
    v-model="isVisible"
    dismissible
    :type="config.type"
    transition="scale-transition"
    style="z-index: 999; position: fixed; left: 50%; transform: translateX(-50%); font-size: 15px; padding: 13px;"
  >
    {{ config.text }}
  </v-alert>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { $notifier } from './plugin';
import { IConfig } from './interface';

@Component({
  name: 'Notifier',
})
export default class Notifier extends Vue {
  public config: IConfig = {} as IConfig;

  public isVisible: boolean = false;
  public timer: number;

  public beforeMount(): void {
    $notifier.$event.$on('toggle', this.onToggle);
  }

  public hide() {
    this.isVisible = false;
  }

  public show() {
    this.isVisible = true;
  }

  public setTimer() {
    this.timer = window.setTimeout(() => {
      this.hide();
    }, 10000);
  }

  public onToggle(
    isVisible: boolean,
    { text, type = 'success' }: IConfig,
  ): void {
    if (isVisible) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.hide();
      }

      this.config.text = text;
      this.config.type = type;

      this.show();
      this.setTimer();
    } else {
      this.hide();
    }
  }

  public beforeDestroy() {
    $notifier.$event.$off('toggle', this.onToggle);
    clearTimeout(this.timer);
  }
}
</script>
