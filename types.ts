
export interface Guest {
  id: string;
  mainName: string;
  additionalGuests: string[];
  totalCount: number;
  timestamp: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
