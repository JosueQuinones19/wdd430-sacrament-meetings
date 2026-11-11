export type MeetingType = 'regular' | 'testimony' | 'stake' | 'general';

export interface HymnInfo {
  number: number;
  title: string;
}

export interface Speaker {
  name: string;
  topic: string;
}

export interface MusicalNumber {
  performer: string;
  title: string;
}

export interface Meeting {
  id: number;
  date: string; // ISO date string (YYYY-MM-DD)
  type: MeetingType;
  wardName: string;
  presiding: string;
  conducting: string;
  openingHymn: HymnInfo;
  openingPrayer: string;
  sacramentHymn: HymnInfo;
  closingHymn: HymnInfo;
  closingPrayer: string;
  announcements: string[];
  wardBusiness: string[];
  stakeBusiness: boolean;
  speakers: Speaker[];
  musicalNumbers: MusicalNumber[];
}
