import { IEvent } from './IEvent';

export interface IParticipant {
  name: string;
}

export interface IAcceptedEvent extends IEvent {
  participants: IParticipant[];
}
