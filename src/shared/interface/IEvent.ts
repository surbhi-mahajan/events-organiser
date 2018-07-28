export interface IParticipant {
  name: string;
}

export interface IEvent {
  id: number;
  owner: number[];
  venue: string;
  startTime: number;
  endTime: number;
  name: string;
  participants?: number[];
}
