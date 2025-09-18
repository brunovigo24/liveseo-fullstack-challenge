export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    street?: string;
    suite?: string;
    zipcode?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export type ViewMode = 'table' | 'cards';