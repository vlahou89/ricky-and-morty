export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}

export interface Data {
  results: Character[];
  info: {
    next: string;
  };
}

export interface CharacterModalProps {
  character: Character;
  episodes: Array<{ id: number; name: string }>;
  closeModal: () => void;
}

export interface CharacterCardProps {
  character: {
    id: number;
    name: string;
    status: string;
    image: string;
  };
  openModal: (character: any) => void;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}
