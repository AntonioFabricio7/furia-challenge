export interface User {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  birthdate: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  interests: string[];
  events: Event[];
  purchases: Purchase[];
  documents: Document[];
  socialProfiles: SocialProfile[];
  esportsProfiles: EsportsProfile[];
  createdAt?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

export interface Purchase {
  id: string;
  product: string;
  date: string;
  value: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  url: string;
}

export interface SocialProfile {
  id: string;
  platform: string;
  username: string;
  url: string;
  connected: boolean;
  status: 'pending' | 'analyzing' | 'verified';
  insights?: {
    engagement: number;
    furiaInteractions: number;
    esportsContent: number;
  };
}

export interface EsportsProfile {
  id: string;
  platform: string;
  username: string;
  url: string;
  relevanceScore?: number;
  status: 'pending' | 'analyzing' | 'verified';
}

export type FormStep = 
  | 'personal' 
  | 'address' 
  | 'interests' 
  | 'documents' 
  | 'social' 
  | 'esports' 
  | 'summary';

export interface InsightData {
  label: string;
  value: number;
  color: string;
}