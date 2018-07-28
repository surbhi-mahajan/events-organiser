<template>
  <v-snackbar
      v-model="isVisible"
      :timeout="0"
      :color="config.type"
      top
    >
    <span style="margin: auto;">{{ config.text }}</span>
    <a @click="isVisible = false">
      <v-icon style="color: rgba(0,0,0,0.3);" right>cancel</v-icon>
    </a>
  </v-snackbar>
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
    { text, type = 'success' }: IConfig = {} as IConfig,
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
