import Vue from 'vue';
import { IConfig } from '../interface';

interface INotifier {
  show(config: IConfig): void;
  hide(): void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $notifier: INotifier;
  }
}
