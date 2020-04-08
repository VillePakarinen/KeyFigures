export interface KeyFigureDto {
  dataset: Dataset;
}

interface Dataset {
  status: Status;
  dimension: Dimension;
  label: string;
  source: string;
  updated: string;
  value: [number | null];
}

interface Status {
  [key: string]: string;
}

interface Dimension {
  "Alue 2020": Alue2020;
  Tiedot: Tiedot;
  Vuosi: Vuosi;
  id: string[];
  size: number[];
  role: Role;
}

interface Alue2020 {
  label: string;
  category: Category;
}

interface Category {
  index: Index;
  label: Label;
}

interface Index {
  [keys: string]: number;
}

interface Label {
  [key: string]: string;
}

interface Tiedot {
  label: string;
  category: Category2;
}

interface Category2 {
  index: Index2;
  label: Label2;
}

interface Index2 {
  [key: string]: number;
}

interface Label2 {
  [key: string]: string;
}

interface Vuosi {
  label: string;
  category: Category3;
}

interface Category3 {
  index: Index3;
  label: Label3;
}

interface Index3 {
  [key: string]: number;
}

interface Label3 {
  [key: string]: string;
}

interface Role {
  time: string[];
}
