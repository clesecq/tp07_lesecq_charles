export type PollutionType = 'plastique' | 'chimique' | 'depot-sauvage' | 'eau' | 'air' | 'autre';

export interface Pollution {
  id: number;
  title: string;
  type: PollutionType;
  description: string;
  observedAt: string;
  location: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
}

export type PollutionPayload = Omit<Pollution, 'id'>;
