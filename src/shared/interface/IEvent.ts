export interface IParticipant {
  name: string;
}

export interface IEvent {
  name: string;
  venue: string;
  startTime: number;
  endTime: number;
  event: string;
  id: number;
  participants?: IParticipant[];
}
