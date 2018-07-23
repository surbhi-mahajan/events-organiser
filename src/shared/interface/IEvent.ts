export interface IParticipant {
  name: string;
}

export interface IEvent {
  id: number;
  owner: number[];
  venue: string;
  startTime: number;
  endTime: number;
  event: string;
  participants?: number[];
}
