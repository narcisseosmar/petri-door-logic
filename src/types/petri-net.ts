export interface PetriNetState {
  places: {
    P1: number; // Porte fermée
    P2: number; // Personne détectée
    P3: number; // Porte ouverte
    P4: number; // Temporisation active
  };
  transitions: {
    T1: boolean; // Détection personne
    T2: boolean; // Ouverture porte
    T3: boolean; // Fin temporisation
    T4: boolean; // Fermeture porte
  };
}

export interface Transition {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  from: string[];
  to: string[];
}

export interface Place {
  id: string;
  name: string;
  description: string;
  tokens: number;
  maxTokens?: number;
}

export interface PetriNetConfig {
  places: Place[];
  transitions: Transition[];
}