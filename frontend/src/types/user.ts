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

// Interface de usuário simplificada para exibição no front
export interface DisplayUser {
  id: number;
  name: string;
  email: string;
  city: string;
}

// Interface de estado para o componente de lista de usuários
export interface UserListState {
  users: User[];
  filteredUsers: DisplayUser[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  viewMode: 'table' | 'cards';
}

// Tipo de modo de visualização 
export type ViewMode = 'table' | 'cards';